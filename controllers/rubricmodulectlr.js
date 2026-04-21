const exammarksall = require('../Models/exammarksall');
const rubricds = require('../Models/rubricds');
const User = require('../Models/user');

exports.createrubrics = async (req, res) =>{
  try {
    const rubric = await rubricds.create(req.body);
    return res.status(201).json(rubric);
  } catch (error) {
  }
}

// controllers/rubricmodulectlr.js
exports.getallrubrics = async (req, res) => {
  try {
    const { colid, programcode, coursecode, examcode, year, semester } = req.query;
    const filter = {};
    if (colid) filter.colid = parseInt(colid);
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (examcode) filter.examcode = examcode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    const rubrics = await rubricds.find(filter);
    return res.json(rubrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updaterubrics = async (req, res) =>{
  try {
    const {id} = req.query;
    const updatedrubrics = await rubricds.findByIdAndUpdate(id, req.body, {new: true});
    return res.json(updatedrubrics);
  } catch (error) {
    
  }
}

exports.deleterubrics = async (req, res) => {
  try {
    await rubricds.findByIdAndDelete(req.query.id);
    return res.status(200).json({
      message: "data deleted successfully"
    });
  } catch (error) {
    
  }
}

exports.getsinglerubrics = async (req, res) =>{
  try {
    const {colid, id} = req.query;
    const rubrics = await rubricds.find({
      _id: id,
      colid: parseInt(colid)
    });
    return res.json(rubrics);
  } catch (error) {
    
  }
}

exports.calculaterubricresult = async (req, res) => {
  try {
    const { examcode, colid, regno, coursecode } = req.query;

    const matchStage = {
      examcode,
      colid: parseInt(colid),
    };
    if (regno) matchStage.regno = regno;
    if (coursecode) matchStage.coursecode = coursecode;

    const results = await rubricds.aggregate([
      { $match: matchStage },

      {
        $addFields: {
          bestInternal: {
            $reduce: {
              input: { $ifNull: ["$internalmarks", []] },
              initialValue: { full: 0, obtain: 0 },
              in: {
                full: { $max: ["$$this.internalfull", "$$value.full"] },
                obtain: { $max: ["$$this.internalobtainmark", "$$value.obtain"] },
              },
            },
          },
          bestAttendance: {
            $reduce: {
              input: { $ifNull: ["$attendancemarks", []] },
              initialValue: { full: 0, obtain: 0 },
              in: {
                full: { $max: ["$$this.attendancefull", "$$value.full"] },
                obtain: { $max: ["$$this.attendanceobtainmark", "$$value.obtain"] },
              },
            },
          },
          bestInternship: {
            $reduce: {
              input: { $ifNull: ["$internshipmarks", []] },
              initialValue: { full: 0, obtain: 0 },
              in: {
                full: { $max: ["$$this.internshipfull", "$$value.full"] },
                obtain: { $max: ["$$this.internshipobtainmark", "$$value.obtain"] },
              },
            },
          },
          bestExtra: {
            $reduce: {
              input: { $ifNull: ["$extracurriculummarks", []] },
              initialValue: { full: 0, obtain: 0 },
              in: {
                full: { $max: ["$$this.extracurriculumfull", "$$value.full"] },
                obtain: { $max: ["$$this.extracurriculumobtainmark", "$$value.obtain"] },
              },
            },
          },
        },
      },

      {
        $addFields: {
          iafull: {
            $add: [
              "$bestInternal.full",
              "$bestAttendance.full",
              "$bestInternship.full",
              "$bestExtra.full",
            ],
          },
          iamarks: {
            $add: [
              "$bestInternal.obtain",
              "$bestAttendance.obtain",
              "$bestInternship.obtain",
              "$bestExtra.obtain",
            ],
          },
          eafull: { $ifNull: ["$externalfull", 0] },
          eamarks: { $ifNull: ["$externalmarks", 0] },
        },
      },

      {
        $addFields: {
          totalfull: { $add: ["$iafull", "$eafull"] },
          totalmarks: { $add: ["$iamarks", "$eamarks"] },
          percentage: {
            $cond: [
              { $gt: [{ $add: ["$iafull", "$eafull"] }, 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: [{ $add: ["$iamarks", "$eamarks"] }, { $add: ["$iafull", "$eafull"] }] },
                      100,
                    ],
                  },
                  2,
                ],
              },
              0,
            ],
          },
        },
      },

      {
        $project: {
          name: 1,
          user: 1,
          colid: 1,
          examcode: 1,
          regno: 1,
          coursecode: 1,
          iafull: 1,
          iamarks: 1,
          eafull: 1,
          eamarks: 1,
          totalfull: 1,
          totalmarks: 1,
          percentage: 1,
        },
      },
    ]);

    if (!results.length) {
      return res.status(404).json({ error: "No rubric data found for given parameters" });
    }

    // Assign grades
    const gradedResults = results.map((r) => {
      const p = Number(r.percentage) || 0;
      let grade = "F";

      if (p >= 90) grade = "O";
      else if (p >= 80) grade = "A+";
      else if (p >= 70) grade = "A";
      else if (p >= 60) grade = "B+";
      else if (p >= 50) grade = "B";
      else if (p >= 40) grade = "C";

      return {
        ...r,
        egrade: grade,
      };
    });

   return res.status(200).json(gradedResults);
  } catch (err) {
  }
};

// controllers/rubricmodulectlr.js
exports.calculatebulkrubricresults = async (req, res) => {
  try {
    const { colid, programcode, coursecode, examcode, year, semester } = req.query;

    const matchStage = {};
    if (colid) matchStage.colid = parseInt(colid);
    if (programcode) matchStage.programcode = programcode;
    if (coursecode) matchStage.coursecode = coursecode;
    if (examcode) matchStage.examcode = examcode;
    if (year) matchStage.year = year;
    if (semester) matchStage.semester = semester;

    const pipeline = [
      { $match: matchStage },
      {
        $addFields: {
          bestInternal: { $max: "$internalmarks.internalobtainmark" },
          internalfull: { $max: "$internalmarks.internalfull" },
          bestAttendance: { $max: "$attendancemarks.attendanceobtainmark" },
          attendancefull: { $max: "$attendancemarks.attendancefull" },
          bestInternship: { $max: "$internshipmarks.internshipobtainmark" },
          internshipfull: { $max: "$internshipmarks.internshipfull" },
          bestExtra: { $max: "$extracurriculummarks.extracurriculumobtainmark" },
          extraFull: { $max: "$extracurriculummarks.extracurriculumfull" }
        }
      },
      {
        $addFields: {
          iafull: {
            $add: [
              { $ifNull: ["$internalfull", 0] },
              { $ifNull: ["$attendancefull", 0] },
              { $ifNull: ["$internshipfull", 0] },
              { $ifNull: ["$extraFull", 0] }
            ]
          },
          iamarks: {
            $add: [
              { $ifNull: ["$bestInternal", 0] },
              { $ifNull: ["$bestAttendance", 0] },
              { $ifNull: ["$bestInternship", 0] },
              { $ifNull: ["$bestExtra", 0] }
            ]
          },
          eafull: { $ifNull: ["$externalfull", 0] },
          eamarks: { $ifNull: ["$externalmarks", 0] }
        }
      },
      {
        $addFields: {
          totalfull: { $add: ["$iafull", "$eafull"] },
          totalmarks: { $add: ["$iamarks", "$eamarks"] },
          totalp: {
            $cond: [
              { $gt: [{ $add: ["$iafull", "$eafull"] }, 0] },
              {
                $round: [
                  {
                    $multiply: [
                      { $divide: [{ $add: ["$iamarks", "$eamarks"] }, { $add: ["$iafull", "$eafull"] }] },
                      100
                    ]
                  },
                  2
                ]
              },
              0
            ]
          }
        }
      },
      {
        $project: {
          user: 1,
          student: "$studentname",
          exam: 1,
          program: 1,
          programcode: 1,
          semester: 1,
          academicyear: "$year",
          course: 1,
          regno: 1,
          coursecode: 1,
          examcode: 1,
          colid: 1,
          iafull: 1,
          iamarks: 1,
          eafull: 1,
          eamarks: 1,
          totalfull: 1,
          totalmarks: 1,
          totalp: 1
        }
      }
    ];

    const results = await rubricds.aggregate(pipeline);

    // Add grades in Node.js
    const gradedResults = results.map(r => {
      let egrade = "F";
      if (r.totalp >= 90) egrade = "O";
      else if (r.totalp >= 80) egrade = "A+";
      else if (r.totalp >= 70) egrade = "A";
      else if (r.totalp >= 60) egrade = "B+";
      else if (r.totalp >= 50) egrade = "B";
      else if (r.totalp >= 40) egrade = "C";

      return { ...r, egrade };
    });

  return res.status(200).json(gradedResults);
  } catch (error) {
  }
};



exports.filterrubricdata = async (req, res) => {
  try {
    const { year, programcode, examcode, coursecode } = req.query;

    const filter = {};

    if (year) filter.year = year;
    if (programcode) filter.programcode = programcode;
    if (examcode) filter.examcode = examcode;
    if (coursecode) filter.coursecode = coursecode;

    const rubrics = await rubricds.find(filter).sort({ regno: 1 });

    return res.status(200).json(rubrics);
  } catch (error) {
  }
};

exports.createexammarks = async (req, res) => {
  try {
    const data = req.body;
    if (!data.colid || !data.regno || !data.coursecode || !data.examcode) {
      return res.status(400).json({ message: "Missing required keys for upsert" });
    }

    const filter = {
      colid: parseInt(data.colid),
      regno: data.regno,
      coursecode: data.coursecode,
      examcode: data.examcode
    };

    // Upsert: if matching doc exists, update; else insert
    const updated = await exammarksall.findOneAndUpdate(
      filter,
      { $set: data },
      { new: true, upsert: true }
    );

   return res.status(200).json(updated);
  } catch (error) {
  }
};

exports.searchstudentbyregno = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const student = await User.findOne({ regno: regno.trim(), colid: parseInt(colid) });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (err) {    
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};


exports.createrubricds1 = async (req, res) => {
  try {
    const data = req.body;
    if (!data.colid || !data.regno || !data.coursecode || !data.examcode) {
      return res.status(400).json({ message: "Missing required keys for upsert" });
    }

    const filter = {
      colid: parseInt(data.colid),
      regno: data.regno,
      coursecode: data.coursecode,
      examcode: data.examcode,
      year: data.year,
      semester: data.semester
    };

     const existing = await rubricds.findOne(filter);

     const internalexamname = req.body.internalexamname;
      const internalfull = Number(req.body.internalfull || 0);
      const internalobtainmark = Number(req.body.internalobtainmark || 0);

   

      // Add or update component
      existing.internalmarks.push({
        internalexamname,
        internalfull,
        internalobtainmark,
      });

      await existing.save();
      

  

 

   return res.status(200).json('Success');
  } catch (error) {
  }
};