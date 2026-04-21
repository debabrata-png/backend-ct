const Task = require("../Models/task1");
const User = require("../Models/user");
const TaskComment = require("../Models/taskcomment");

exports.createtask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return res.status(200).json(task);
    } catch (error) {
    }
}

exports.changetaskstatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        const changedstatustask = await Task.findByIdAndUpdate(id, {
            status: status,
            ...(status === "Completed" && {completedat : new Date()}),
            ...(status === "Approved" && {approvedat: new Date()})
        }, {
            new: true
        })
        return res.status(200).json(changedstatustask);
    } catch (error) {
    }
}

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
        const q = (req.query.q || '').trim();
        if (!q) return res.json([]);
        const regex = new RegExp(q, 'i');
        const users = await User.find({
            $or: [{ name: regex }, { email: regex }]
        }).limit(10).select('name email');
        res.json(users);
    } catch (error) {

    }
}

exports.login = async (req, res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const { colid, name, email: userEmail, regno, role } = user;

    return res.status(200).json({ colid, name, email: userEmail, regno, role });
} catch(err){}
} 

exports.searchTasks = async (req, res) => {
  try {
    const { role, status, q, colid, email } = req.query;

    const ownerKey = `${role}email`;
    const baseFilter = { [ownerKey]: email, status, colid: Number(colid) };

    let tasks;
    if (!q?.trim()) {
      // fast path – no search text
      tasks = await Task.find(baseFilter)
                        .lean()
                        .sort({ createdAt: -1 })
                        .limit(200);
    } else {
      // text search path
      tasks = await Task.find({
        ...baseFilter,
        $text: { $search: q.trim() },
      })
        .lean()
        .sort({ score: { $meta: "textScore" } })
        .limit(200);
    }

    res.json(tasks);
  } catch (err) {
  }
};


exports.createtaskcomment = async (req, res) =>{
    try {
        const taskcomment = await TaskComment.create(req.body);
        return res.status(200).json(taskcomment) 
    } catch (error) {
        console.log(error);
    }
}

exports.gettaskcommentsbytaskid = async (req, res) =>{
    try {
        const {taskid, colid} = req.query;
        const taskcomments = await TaskComment.find({
            taskid: taskid,
            colid: colid
        });
        return res.json(taskcomments);
    } catch (error) {
        console.log(error);
    }
}