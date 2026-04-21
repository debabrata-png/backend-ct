const mongoose = require("mongoose");

const tasktimesheetschema = new mongoose.Schema({
    taskid: {type: mongoose.Schema.Types.ObjectId, ref: "Task"},
    taskduration: {type: String},
    expectedtime: {type: String},
    tasktype: {type: String},
    submitedat: {type: Date },
    completedat:{type: Date},
    colid: {type: Number}
})

const Tasktimesheet = mongoose.model("Tasktimesheet", tasktimesheetschema);

module.exports = Tasktimesheet;
