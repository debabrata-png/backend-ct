const Task = require("../Models/task");
const User = require("../Models/user");
const TaskComment = require("../Models/taskcomment");
const Tasktimesheet = require("../Models/tasktimesheet");

exports.createtask = async (req, res) => {
  try {
    const {
      title, description, creatoremail, creatorname,
      assigneeemail, assigneename, followeremail, followername,
      colid, tasktype = "Other"
    } = req.body;

    const task = await Task.create({
      title, description, creatoremail, creatorname,
      assigneeemail, assigneename, followeremail, followername,
      colid,
    });

    await Tasktimesheet.create({
      taskid: task._id,
      tasktype,
      taskduration: "0m",
      colid: colid
    });

    return res.json(task);
  } catch (error) {
  }
}

exports.changetaskstatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { duration, submitedat } = req.body;
    // update task
    const task = await Task.findByIdAndUpdate(
      id,
      { status: "Completed", completedat: new Date() },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });

    // upsert timesheet
    await Tasktimesheet.updateOne(
      { taskid: id },
      {
        taskduration: duration,
        completedat: new Date(),
        submitedat: new Date(submitedat),
      },
      { upsert: true }
    );

    return res.json({ ok: true });
  } catch (err) {
  }
};

// POST /api/v2/approvetask
exports.approvetask = async (req, res) => {
  try {
    const { id, expectedtime } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { status: "Approved", approvedat: new Date() },
      { new: true }
    );

    // upsert timesheet with approver data
    await Tasktimesheet.updateOne(
      { taskid: task._id },
      {
        expectedtime: expectedtime,
      },
      { upsert: true }
    );

    return res.json({ ok: true });
  } catch (err) {
  }
};

exports.updatetask = async (req, res) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const updatedtask = await Task.findByIdAndUpdate(id,
      { ...data },
      { new: true }
    );
    return res.status(200).json(updatedtask);
  } catch (error) {
  }
}

exports.deletetask = async (req, res) => {
  try {
    const { id } = req.query;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({
      success: "true",
      message: "Task deleted successfully"
    })
  } catch (error) {
  }
}

exports.searchuserbyemailorname = async (req, res) => {
  try {
    const { colid } = req.query;
    const q = (req.query.q || '').trim();
    const regex = new RegExp(q, 'i');
    const users = await User.find(
      {
        colid: parseInt(colid), role: "Faculty",
        $or: [{ name: regex }, { email: regex }]
      }).limit(10).select('name email');
    return res.json(users);
  } catch (error) {
    console.log(error);

  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const { colid, name, email: userEmail, regno, role } = user;

    return res.status(200).json({ colid, name, email: userEmail, regno, role });
  } catch (err) { }
}

/* ------------- 1. Plain fetch controllers ------------- */
const fetchFactory = (roleKey) => async (req, res) => {
  try {
    const { status, colid, email } = req.query;
    const tasks = await Task
      .find({ [roleKey]: email, status, colid: Number(colid) })
      .lean()
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(tasks);
  } catch { res.status(500).json([]); }
};

exports.getcreatortasks = fetchFactory('creatoremail');
exports.getassigneetasks = fetchFactory('assigneeemail');
exports.getfollowertasks = fetchFactory('followeremail');

// GET /api/v2/searchtasks
exports.searchtasks = async (req, res) => {
  try {
    const { q, colid, status, email } = req.query;   // email = caller
    if (!q?.trim()) return res.json([]);

    const query = {
      colid: Number(colid),
      status,                                       // "Approved", "Completed", …
      $text: { $search: q.trim() },
      $or: [
        { creatoremail: email },
        { assigneeemail: email },
        { followeremail: email }
      ]
    };

    const tasks = await Task
      .find(query, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(200)
      .lean();

    res.json(tasks);
  } catch {
  }
};

exports.createtaskcomment = async (req, res) => {
  try {
    const taskcomment = await TaskComment.create(req.body);
    return res.status(200).json(taskcomment)
  } catch (error) {
  }
}

exports.gettaskcommentsbytaskid = async (req, res) => {
  try {
    const { taskid, colid } = req.query;
    const taskcomments = await TaskComment.find({
      taskid: taskid,
      colid: parseInt(colid)
    });
    return res.json(taskcomments);
  } catch (error) {
  }
}

exports.gettasktimesheetbyid = async (req, res) => {
  try {
    const { taskid, colid } = req.query;
    const ts = await Tasktimesheet.findOne({
      taskid: taskid,
      colid: parseInt(colid)
    }).lean();
    return res.status(200).json(ts);
  } catch (error) {
  }
}
