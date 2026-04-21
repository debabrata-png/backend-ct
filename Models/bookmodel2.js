const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    unique: false,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true
  },
  booklanguage: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publishedDate: {
    type: String,
    trim: true
  },
  accessid: {
    type: String,
    required: [true, "Access ID is required"],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    trim: true
  },

  // ✅ Newly added optional fields (NOT required)
  source: {
    type: String,
    trim: true
  },
  editionOfBook: {
    type: String,
    trim: true
  },
  volume: {
    type: String,
    trim: true
  },
  classNo: {
    type: String,
    trim: true
  },
  donatedBy: {
    type: String,
    trim: true
  },

  pages: {
    type: String,
    trim: true
  },
  issuedstatus: {
    type: String,
    enum: ["available", "issued", "damaged", "lost"],
    default: "available",
    trim: true
  },
  bulkUploadBatch: {
    type: String,
    trim: true
  },
  colid: {
    type: String,
    required: [true, "College ID is required"],
    trim: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  },
  libraryid: {
    type: String,
    required: [true, "Library ID is required"],
    trim: true
  },
  libraryname: {
    type: String,
    trim: true
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

const bookmodel = mongoose.model("Bookmodel", bookSchema);
module.exports = bookmodel;
