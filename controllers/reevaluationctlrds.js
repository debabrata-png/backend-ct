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
        },
      },
      {
        $addFields: {
          theoryPercentage: {
            $cond: {
              if: { $gt: ['$thmax', 0] },
              then: {
                $multiply: [
                  { $divide: ['$thobtained', '$thmax'] },
                  100
                ]
              },
              else: null
            }
          }
        }
      },
      {
        $match: {
          thmax: { $gt: 0 }, // Only papers with theory component
          theoryPercentage: { $lt: 35 } // Failed in theory (< 35% per UGC)
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
    const { regno, program, branch, regulation, semester, year, papercode, colid } = req.body;

    // Ensure colid is a Number
    const colidNumber = Number(colid);

    // Check if already applied
    const existing = await Reevaluationds.findOne({
      regno, program, branch, regulation, semester, year, papercode
    });

    if (existing) {
      return res.status(400).json({ error: 'Reevaluation already applied for this paper' });
    }

    // Get the original theory marks ONLY
    const markEntry = await ExamMarks2ds.findOne({
      regno, program, branch, regulation, semester, year, papercode
    });

    if (!markEntry) {
      return res.status(404).json({ error: 'Mark entry not found' });
    }

    // Create entry with ONLY theory marks and colid as Number
    const entry = await Reevaluationds.create({
      ...req.body,
      colid: colidNumber, // Ensure it's a Number
      originalmarks: markEntry.thobtained, // ONLY theory obtained marks
      maxmarks: markEntry.thmax, // ONLY theory max marks
      status: 'pending',
      applieddate: new Date()
    });

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
      // Update ONLY thobtained in ExamMarks2ds
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

    // Update ONLY thobtained in ExamMarks2ds
    await updateExamMarksds(reevaluation, avgMarks);
  }
}

// Update ExamMarks2ds with new theory marks ONLY
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
    // Update ONLY theory marks (thobtained)
    await ExamMarks2ds.findByIdAndUpdate(markEntry._id, {
      thobtained: Math.round(newMarks)
    });
  }
}

module.exports.processReevaluationds = processReevaluationds;
