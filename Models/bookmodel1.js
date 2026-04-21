const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String
  },
  title: {
    type: String
  },
  author: {
    type: String
  },
  booklanguage: {
    type: String
  },
  isbn: {
    type: String
  },
  publisher: {
    type: String
  },
  publishedDate: {
    type: String,
  },
  accessid: {
    type: String,
    required: [true, "Access ID is required"],
    unique: true
  },
  category: {
    type: String
  },
  colid: {type: Number},
 
  addedDate: {
    type: Date,
    default: Date.now
  },
  libraryid: {
    type: String,
    required: [true, "Library ID is required"]
  },
  libraryname: {
    type: String
  }
}, {
  timestamps: true
});

bookSchema.index({
  title: "text",
  author: "text",
  bookId: "text",
  isbn: "text",
  accessid: "text"
});


const bookmodel1 = mongoose.model("Bookmodel1", bookSchema);
module.exports = bookmodel1;
