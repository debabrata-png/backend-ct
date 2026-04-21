const Reevaluationds = require('../Models/reevaluationds.js');
const ExamMarks2ds = require('../Models/exammarks2ds.js');
const ExaminerConfigds = require('../Models/examinerconfigds.js');

// Get failed papers for a student
exports.getFailedPapersds = async (req, res) => {
  try {
    const { regno, program, branch, regulation, semester, year } = req.query;
    
    const failedPapers = await ExamMarks2ds.aggregate([
      {
        $match: {
          regno,
          program,
          branch,
          regulation,
          semester,
          year,
        }
      },
      {
        $addFields: {
          totalobtained: {
            $add: [
              { $ifNull: ['$thobtained', 0] },
              { $ifNull: ['$probtained', 0] },
              { $ifNull: ['$iatobtained', 0] },
              { $ifNull: ['$iapobtained', 0] }
            ]
          },
          totalmax: {
            $add: [
              { $ifNull: ['$thmax', 0] },
              { $ifNull: ['$prmax', 0] },
              { $ifNull: ['$iatmax', 0] },
              { $ifNull: ['$iapmax', 0] }
            ]
          }
        }
      },
      {
        $addFields: {
          percentage: {
            $multiply: [
              { $divide: ['$totalobtained', '$totalmax'] },
              100
            ]
          }
        }
      },
      {
        $match: {
          percentage: { $lt: 40 } // Failed papers (below 40%)
        }
      }
    ]);

    res.status(200).json(failedPapers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apply for reevaluation
exports.applyReevaluationds = async (req, res) => {
  try {
    const entry = await Reevaluationds.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get reevaluation applications (for students)
exports.listReevaluationsds = async (req, res) => {
  try {
    const list = await Reevaluationds.find(req.query);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reevaluation papers for examiner
exports.getReevaluationForExaminerds = async (req, res) => {
  try {
    const { examinerEmail } = req.query;
    
    // Find all papers where this examiner is assigned
    const configs = await ExaminerConfigds.find({
      $or: [
        { examiner1: examinerEmail },
        { examiner2: examinerEmail },
        { examiner3: examinerEmail }
      ]
    });

    // Get all reevaluation applications for these papers
    const reevaluations = [];
    for (const config of configs) {
      const papers = await Reevaluationds.find({
        papercode: config.papercode,
        program: config.program,
        branch: config.branch,
        regulation: config.regulation,
        semester: config.semester,
      });

      for (const paper of papers) {
        // Determine which examiner this user is
        let examinerRole = null;
        if (config.examiner1 === examinerEmail) examinerRole = 'examiner1';
        else if (config.examiner2 === examinerEmail) examinerRole = 'examiner2';
        else if (config.examiner3 === examinerEmail) examinerRole = 'examiner3';

        reevaluations.push({
          ...paper.toObject(),
          examinerRole,
          config
        });
      }
    }

    res.status(200).json(reevaluations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit marks by examiner
exports.submitExaminerMarksds = async (req, res) => {
  try {
    const { _id, examinerRole, marks } = req.body;
    
    const updateFields = {};
    updateFields[`${examinerRole}marks`] = marks;
    updateFields[`${examinerRole}status`] = 'completed';

    const reevaluation = await Reevaluationds.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    // Process the reevaluation logic
    await processReevaluationds(reevaluation);

    res.status(200).json(reevaluation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Process reevaluation logic
async function processReevaluationds(reevaluation) {
  const { 
    examiner1marks, 
    examiner2marks, 
    examiner3marks, 
    examiner1status, 
    examiner2status,
    examiner3status,
    originalmarks,
    status,
    _id
  } = reevaluation;

  // Stage 1: Both examiner1 and examiner2 have submitted
  if (examiner1status === 'completed' && examiner2status === 'completed' && status === 'pending') {
    const avgMarks = (examiner1marks + examiner2marks) / 2;
    const increasePercentage = ((avgMarks - originalmarks) / originalmarks) * 100;

    if (increasePercentage >= 0 && increasePercentage < 10) {
      // No change, keep original marks
      await Reevaluationds.findByIdAndUpdate(_id, {
        finalmarks: originalmarks,
        status: 'completed',
        completeddate: new Date()
      });
      
      // No update to ExamMarks2ds
    } else if (increasePercentage >= 10 && increasePercentage < 20) {
      // Update to average of examiner1 and examiner2
      await Reevaluationds.findByIdAndUpdate(_id, {
        finalmarks: avgMarks,
        status: 'completed',
        completeddate: new Date()
      });
      
      // Update ExamMarks2ds
      await updateExamMarksds(reevaluation, avgMarks);
    } else if (increasePercentage >= 20) {
      // Send to examiner3
      await Reevaluationds.findByIdAndUpdate(_id, {
        status: 'stage2'
      });
    } else {
      // Decrease or negative case - keep original
      await Reevaluationds.findByIdAndUpdate(_id, {
        finalmarks: originalmarks,
        status: 'completed',
        completeddate: new Date()
      });
    }
  }

  // Stage 2: Examiner3 has submitted
  if (status === 'stage2' && examiner3status === 'completed') {
    const avgMarks = (examiner1marks + examiner2marks + examiner3marks) / 3;
    
    await Reevaluationds.findByIdAndUpdate(_id, {
      finalmarks: avgMarks,
      status: 'completed',
      completeddate: new Date()
    });
    
    // Update ExamMarks2ds
    await updateExamMarksds(reevaluation, avgMarks);
  }
}

// Update ExamMarks2ds with new marks
async function updateExamMarksds(reevaluation, newMarks) {
  const { regno, papercode, program, branch, regulation, semester, year } = reevaluation;
  
  // Find the original mark entry
  const markEntry = await ExamMarks2ds.findOne({
    regno,
    papercode,
    program,
    branch,
    regulation,
    semester,
    year
  });

  if (markEntry) {
    // Calculate how to distribute the new marks (proportionally)
    const oldTotal = (markEntry.thobtained || 0) + (markEntry.probtained || 0) + 
                     (markEntry.iatobtained || 0) + (markEntry.iapobtained || 0);
    
    if (oldTotal > 0) {
      const ratio = newMarks / oldTotal;
      
      await ExamMarks2ds.findByIdAndUpdate(markEntry._id, {
        thobtained: Math.round((markEntry.thobtained || 0) * ratio),
        probtained: Math.round((markEntry.probtained || 0) * ratio),
        iatobtained: Math.round((markEntry.iatobtained || 0) * ratio),
        iapobtained: Math.round((markEntry.iapobtained || 0) * ratio),
      });
    }
  }
}

module.exports.processReevaluationds = processReevaluationds;
