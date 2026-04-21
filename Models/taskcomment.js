const mongoose = require("mongoose");

const taskcommentschema = new mongoose.Schema({
    // taskid: {type: String},
    taskid: {type: mongoose.Schema.Types.ObjectId, ref: "Task1"},
    comment: {type: String},
    authoremail: {type: String},
    authorname: {type: String},
    colid: {type: Number} 
},
{
    timestamps: true, // This enables createdAt and updatedAt
  }
)

const TaskComment = mongoose.model("taskcomment2", taskcommentschema);
module.exports = TaskComment;