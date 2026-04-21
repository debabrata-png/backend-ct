const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/user");
// const applicationFormModel = require("./../Models/application_model1");
// const applicationFormModel = require("./../Models/appmodel1");
const applicationFormModel = require("./../Models/appmodel2");

const admitcardmodel = require("../Models/admitcardmodel");
const admitcardtemplatemodel = require("../Models/admitcardtemplatemodel");
const examApplicationmodel = require("../Models/examapplication");
const exammodel = require("../Models/exammodel");



const Kpi = require("./../Models/kpi");

const AWS = require('aws-sdk');

// import applicationFormModel from "../models/application_model.js";

exports.createApplicationForm = async (req, res) => {
  try {
    const formData = { ...req.body };

    // Provide defaults for required fields that some form templates may not collect
    if (!formData.email) formData.email = `pending_${Date.now()}@example.com`;
    if (!formData.password) formData.password = "TemporaryPass123!";
    if (!formData.phone) formData.phone = "0000000000";
    if (!formData.name && (formData.firstName || formData.lastName)) {
      formData.name = [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" ");
    }

    const applicationForm = await applicationFormModel.create({
      ...formData
    })
    return res.status(201).json({ message: "Application form created successfully", data: applicationForm });
  } catch (error) {
    res.status(400).json({ message: "Error creating application form", error: error.message });
  }
};

exports.getApplicationForm = async (req, res) => {
  try {
    const applicationForm = await applicationFormModel.findById(req.params.id);
    if (!applicationForm) {
      return res.status(404).json({ message: "Application form not found" });
    } else {
      return res.status(200).json({ data: applicationForm });
    }
    //res.status(200).json({ data: applicationForm });
  } catch (error) {
    //res.status(500).json({ message: "Error fetching application form", error: error.message });
  }
};

exports.getappbyyear = async (req, res) => {
  try {
    const colid1 = parseInt(req.query.colid);
    // const lcat1233=await mtestnewm.find({"_id" : ObjectId(req.query.id)});
    const lcat1233 = await applicationFormModel.find().sort({ "twelfthMarks": -1 })
      .where('colId')
      .equals(req.query.colid)
      .where('year')
      .equals(req.query.year)
      .where('programOptingFor')
      .equals(req.query.program);



    //console.log(lcat1233);
    return res.status(200).json({
      status: 'Success',
      data: {
        classes: lcat1233
      }
    });
  } catch (err) {
    // res.status(400).json({
    //     status:'Failed',
    //     message: err
    // });

  }
};

exports.getadmappcount = async (req, res) => {
  try {
    //const user1=req.query.user;
    const colid1 = parseInt(req.query.colid);
    const lcat1233 = await applicationFormModel.aggregate([
      {
        $match: { colId: req.query.colid },
      },
      {
        $group: {
          // _id: "$programOptingFor",
          _id: {
            programOptingFor: "$programOptingFor"
          },
          total_attendance: { $sum: 1 },
        },
      },
    ]);
    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: lcat1233,
      },
    });
  } catch (err) {
    //res.status(400).json({
    // status: "Failed",
    //  message: err,
    // });
  }
};

exports.getappbyyearcat = async (req, res) => {
  try {
    const colid1 = parseInt(req.query.colid);
    // const lcat1233=await mtestnewm.find({"_id" : ObjectId(req.query.id)});
    const lcat1233 = await applicationFormModel.find().sort({ "twelfthMarks": -1 })
      .where('colId')
      .equals(req.query.colid)
      .where('category')
      .equals(req.query.category)
      .where('year')
      .equals(req.query.year)
      .where('programOptingFor')
      .equals(req.query.program);



    //console.log(lcat1233);
    return res.status(200).json({
      status: 'Success',
      data: {
        classes: lcat1233
      }
    });
  } catch (err) {
    // res.status(400).json({
    //     status:'Failed',
    //     message: err
    // });

  }
};



// export const applicationFormController = {
//   createApplicationForm,
//     getApplicationForm
// };

// Jul 5 2025


exports.getProgramsByYear = async (req, res) => {
  try {
    const { year } = req.query;
    // if (!year) return res.status(400).json({ error: "Year is required" });

    const programs = await User.distinct("programcode", { admissionyear: year });
    res.json(programs);
  } catch (err) {
    //res.status(500).json({ error: err.message });
  }
};

exports.getSemestersByProgram = async (req, res) => {
  try {
    const { year, program } = req.query;
    // if (!year || !program)
    //   return res.status(400).json({ error: "Year and program are required" });

    const semesters = await User.distinct("semester", {
      admissionyear: year,
      programcode: program,
    });

    res.json(semesters);
  } catch (err) {
    //res.status(500).json({ error: err.message });
  }
};

exports.filterUsers = async (req, res) => {
  try {
    const { admissionyear, programcode, semester } = req.query;
    // if (!admissionyear || !programcode || !semester)
    //   return res.status(400).json({ error: "All filters are required" });

    const users = await User.find({
      admissionyear,
      programcode,
      semester,
    });

    res.json(users);
  } catch (err) {
  }
};

exports.addUser = async (req, res) => {
  try {
    const userData = req.body;

    // Basic validation (optional but good to have)
    // if (!userData.email || !userData.regno || !userData.name) {
    //   return res.status(400).json({ message: "Required fields missing" });
    // }

    const existing = await User.findOne({ email: userData.email });
    // if (existing) {
    //   return res.status(409).json({ message: "User already exists with this email" });
    // }

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
  }
};

exports.fetchuserbyregno = async (req, res) => {
  try {
    const { regno } = req.params;

    // if (!regno) {
    //   return res.status(400).json({ error: "Registration number is required." });
    // }

    const user = await User.findOne({ regno });

    // if (!user) {
    //   return res.status(404).json({ error: "Student not found." });
    // }

    res.json(user);
  } catch (error) {

  }
}


exports.releaseadmitCards = async (req, res) => {
  const { templateId, examCenter } = req.body;

  // if (!templateId || !examCenter) {
  //   return res.status(400).json({ message: "Template ID and Exam Center are required." });
  // }

  try {
    // Delete previous config and store new one (singleton)
    await admitcardmodel.deleteMany({});
    const config = await admitcardmodel.create({ templateId, examCenter });

    res.status(200).json({
      message: "✅ Admit card release settings saved successfully.",
      config
    });
  } catch (error) {

  }
};


exports.getadmitcardbyregno = async (req, res) => {
  const { regno } = req.params;

  // if (!regno) {
  //   return res.status(400).json({ message: "Registration number is required." });
  // }

  try {
    const application = await examApplicationmodel.findOne({
      regno: regno.trim(),
      applicationstatus: "approved",
    }).lean();

    // if (!application) {
    //   return res.status(404).json({ message: "No approved application found with this registration number." });
    // }

    const config = await admitcardmodel.findOne().lean();

    // if (!config) {
    //   return res.status(400).json({ message: "Admit card release settings not configured by admin." });
    // }

    const template = await admitcardtemplatemodel.findById(config.templateId).lean();

    // if (!template) {
    //   return res.status(404).json({ message: "Template not found for this admit card." });
    // }

    const enabledSubjects = application.subjects.filter(sub => sub.enabled === "yes");

    // if (!enabledSubjects.length) {
    //   return res.status(400).json({ message: "No enabled subjects for admit card." });
    // }

    const responseData = {
      studentname: application.studentname,
      regno: application.regno,
      program: application.program,
      semester: application.semester,
      examdate: application.examdate,
      examCenter: config.examCenter,
      subjects: enabledSubjects.map(sub => ({
        subjectcode: sub.subjectcode,
        subjectname: sub.subjectname,
        examtime: sub.examtime || "TBD",
      })),
      template
    };

    res.status(200).json(responseData);
  } catch (error) {
  }
};




exports.createadmitcardtemplate = async (req, res) => {
  try {
    const data = req.body;
    const newadmitcardtemplate = await admitcardtemplatemodel.create(data);

    return res.status(201).json({
      success: true,
      message: "Admit card template created successfully",
      data: newadmitcardtemplate
    });
  } catch (error) {

  }
}

exports.getadmitcardtemplates = async (req, res) => {
  try {
    const templates = await admitcardtemplatemodel.find();
    // if (!templates || templates.length === 0) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "No admit card templates found"
    //     });
    // } else {
    //     return res.status(200).json(templates);
    // }
    return res.status(200).json(templates);
  } catch (error) {

  }
}

exports.getadmitcardtemplatebyid = async (req, res) => {
  try {
    const templateid = req.params.id;
    const template = await admitcardtemplatemodel.findById(templateid);

    // if (!template) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Admit card template not found"
    //     });
    // } else {
    //     return res.status(200).json({
    //         success: true,
    //         message: "Admit card template retrieved successfully",
    //         data: template
    //     });
    // }
    return res.status(200).json({
      success: true,
      message: "Admit card template retrieved successfully",
      data: template
    });
  } catch (error) {

  }
}






exports.createexamapplication = async (req, res) => {
  try {
    const examapplicationdata = req.body;
    const examapplication = await examApplicationmodel.create(examapplicationdata);
    // if (!examapplication) {
    //     return res.status(400).json({
    //         message: "Failed to create exam application",
    //     });
    // }
    return res.status(201).json({
      message: "Exam application created successfully",
    });
  } catch (error) {

  }
}

exports.getpendingexamapplications = async (req, res) => {
  try {
    const examapplications = await examApplicationmodel.find({
      applicationstatus: "pending"
    }).sort({ createdAt: 1 }).select("-__v" + " -createdAt -updatedAt");
    // if (!examapplications) {
    //     return res.status(200).json({
    //         message: "No exam applications found",
    //         data: [],
    //     });
    // }
    return res.status(200).json({
      message: "Exam applications retrieved successfully",
      data: examapplications,
    });
  } catch (error) {

  }
}

exports.getapprovedexamapplications = async (req, res) => {
  try {
    const examapplications = await examApplicationmodel.find({
      applicationstatus: "approved"
    }).sort({ createdAt: 1 }).select("-__v  -createdAt -updatedAt");
    // if (!examapplications) {
    //     return res.status(200).json({
    //         message: "No exam applications found",
    //         data: [],
    //     });
    // }
    return res.status(200).json({
      message: "Exam applications retrieved successfully",
      data: examapplications,
    });
  } catch (error) {

  }
}

exports.getrejectedexamapplications = async (req, res) => {
  try {
    const examapplications = await examApplicationmodel.find({
      applicationstatus: "rejected"
    }).sort({ createdAt: 1 }).select("-__v -createdAt -updatedAt");
    // if (!examapplications) {
    //     return res.status(200).json({
    //         message: "No exam applications found",
    //         data: [],
    //     });
    // }
    return res.status(200).json({
      message: "Exam applications retrieved successfully",
      data: examapplications,
    });
  } catch (error) {

  }
}
exports.updateexamapplicationstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationstatus } = req.body;

    // if (!["approved", "rejected"].includes(applicationstatus)) {
    //     return res.status(400).json({
    //         message: "Invalid application status",
    //     });
    // }

    const updatedApplication = await examApplicationmodel.findByIdAndUpdate(
      id,
      { applicationstatus },
      { new: true }
    );

    // if (!updatedApplication) {
    //     return res.status(404).json({
    //         message: "Exam application not found",
    //     });
    // }

    return res.status(200).json({
      message: "Exam application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {

  }
}


exports.getFilteredApplications = async (req, res) => {
  try {
    const { year, program, semester, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = {};

    if (year && !isNaN(parseInt(year))) {
      filter.$expr = {
        $eq: [{ $year: "$examdate" }, parseInt(year)],
      };
    }

    if (program) {
      filter.program = program.trim();
    }

    if (semester) {
      filter.semester = semester.trim();
    }

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const applications = await examApplicationmodel
      .find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await examApplicationmodel.countDocuments(filter);

    return res.status(200).json({
      status: true,
      message: "Filtered applications fetched successfully",
      data: applications,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      totalApplications: total,
    });
  } catch (error) {
  }
};

exports.updateSubjectEnabledStatus = async (req, res) => {
  try {
    const { applicationId, subjectname } = req.params;
    const { enabled } = req.body;

    // if (!["yes", "no"].includes(enabled)) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Invalid 'enabled' value. Use 'yes' or 'no'."
    //   });
    // }

    const updatedApplication = await examApplicationmodel.findOneAndUpdate(
      { _id: applicationId, "subjects.subjectname": subjectname },
      { $set: { "subjects.$.enabled": enabled } },
      { new: true }
    );

    // if (!updatedApplication) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "Application or subject not found."
    //   });
    // } else{
    //     return res.status(200).json({
    //   status: true,
    //   message: `Subject '${subjectname}' has been ${enabled === "yes" ? "enabled" : "disabled"} successfully.`,
    //   data: updatedApplication
    // });
    // }
    return res.status(200).json({
      status: true,
      message: `Subject '${subjectname}' has been ${enabled === "yes" ? "enabled" : "disabled"} successfully.`,
      data: updatedApplication
    });

  } catch (error) {

  }
};








exports.createexam = async (req, res) => {
  try {
    const data = req.body;
    const newexam = await exammodel.create({
      ...data,
    })
    // if (!newexam) {
    //     return res.status(400).json({
    //         status: false,
    //         message: "Exam creation failed"
    //     })
    // } else {

    // }
    return res.status(201).json({
      status: true,
      message: "Exam created successfully",
      data: newexam
    })
  } catch (error) {

  }
}

exports.getexambyyear = async (req, res) => {
  try {
    const { year, program, semester } = req.query;

    // if (!year || isNaN(parseInt(year))) {
    //   return res.status(400).json({ message: "Invalid year provided" });
    // }

    const filters = {
      $expr: {
        $eq: [{ $year: "$examdate" }, parseInt(year)],
      },
    };

    if (program) filters.program = program.trim();
    if (semester) filters.semester = semester.trim();

    const exam = await exammodel
      .findOne(filters)
      .select("examname examdate subjects program semester");

    // if (!exam) {
    //   return res.status(404).json({
    //     status: false,
    //     message: "No exam found for given filters",
    //   });
    // }

    return res.status(200).json({
      status: true,
      message: "Exam fetched successfully",
      data: exam,
    });
  } catch (err) {

  }
};


exports.getExamFilters = async (req, res) => {
  try {
    const programs = await exammodel.distinct("program");
    const semesters = await exammodel.distinct("semester");
    return res.status(200).json({ status: true, programs, semesters });
  } catch (err) {

  }
};


