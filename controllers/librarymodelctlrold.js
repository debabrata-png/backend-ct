const bookmodel = require("../Models/bookmodel1");
const issuebookmodel = require("../Models/issuebook");
const librarymodel = require("../Models/librarymodel1");
const User = require("../Models/user");

exports.createlibrary = async (req, res) => {
  try {
    const { libraryid, libraryname, libraryincharge, contactno, colid } = req.body;

    // creating the database
    const newlibrary = await librarymodel.create({
      libraryid: libraryid,
      libraryname: libraryname,
      libraryincharge: libraryincharge,
      contactno: contactno,
      colid: colid
    })
    // return the new library
    return res.status(201).json({
      messsage: "library created successfully",
      success: true,
      data: newlibrary
    })
  } catch (error) {

  }
}

exports.getlibrary = async (req, res) => {
  try {
    const id = req.params.id;
    // fetch trhe llibrary by id
    const library = await librarymodel.findOne({
      _id: id
    })
    // return with 200 status code
    return res.status(200).json({
      message: "libraray fetched successfully",
      success: true,
      data: library
    })
  } catch (error) {

  }
}

exports.getalllibrary = async (req, res) => {
  try {
    const colid = req.params.colid;
    const alllibrary = await librarymodel.find({
      colid: colid,
    });
    // return with 200 status code
    return res.status(200).json({
      message: "librarymodel fetched successfully",
      success: true,
      data: alllibrary
    })
  } catch (error) {

  }
}

exports.updatelibrary = async (req, res) => {
  try {
    const datatoupdate = req.body;
    const id = req.query.id;
    // db operation here
    const updatedlibrary = await librarymodel.findByIdAndUpdate({
      _id: id
    },
      {
        ...datatoupdate
      })
    return res.status(200).json({
      message: "library updated successfully",
      success: true,
      data: updatedlibrary
    })
  } catch (error) {

  }
}

exports.deletelibrary = async (req, res) => {
  try {
    const id = req.params.id;
    await librarymodel.findOneAndDelete({
      _id: id
    })
    return res.status(200).json({
      message: "library deleted successfully",
      success: true
    })
  } catch (error) {

  }
}

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const formdata = req.body;
    const newBook = await bookmodel.create({ ...formdata });
    return res.status(201).json({ success: true, data: newBook });
  } catch (error) {
  }
};


// Get all books by library ID with pagination
exports.getbooksbylibraryid = async (req, res) => {
  try {
    const { libraryid, page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const books = await bookmodel
      .find({ libraryid })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await bookmodel.countDocuments({ libraryid });

    return res.status(200).json({
      success: true,
      data: {
        books,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
  }
};


// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await bookmodel.findById(req.params.id);

    return res.json({ success: true, data: book });
  } catch (error) {

  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query, libraryid } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      libraryid,
      $text: { $search: query }
    };

    const results = await bookmodel.find(filter).skip(skip).limit(limit);
    const total = await bookmodel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: results,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
  }
};



// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await bookmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    return res.json({ success: true, data: updatedBook });
  } catch (error) {
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    await bookmodel.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {

  }
};

// Create a new issue record
exports.createIssuedBook = async (req, res) => {
  try {
    const newIssue = await issuebookmodel.create(req.body);
    //console.log(req.body);
    return res.status(201).json({ message: "Book issued successfully", data: newIssue });
  } catch (error) {
  }
};

// Get all issued books
exports.getAllIssuedBooks = async (req, res) => {
  try {
    const libraryid = req.query.libraryid;
    const issuedBooks = await issuebookmodel.find(
      {
        libraryid: libraryid
      }
    ).sort({ issuedate: -1 });
    return res.status(200).json({ data: issuedBooks });
  } catch (error) {
  }
};

// Get a single issued book by ID
exports.getIssuedBookById = async (req, res) => {
  try {
    const book = await issuebookmodel.findById(req.params.id);

    return res.status(200).json({ data: book });
  } catch (error) {
  }
};

// Update an issued book by ID
exports.updateIssuedBook = async (req, res) => {
  try {
    const updatedBook = await issuebookmodel.findByIdAndUpdate(req.body.id, req.body, { new: true });

    return res.status(200).json({ message: "Record updated", data: updatedBook });
  } catch (error) {
  }
};

// Delete an issued book by ID
exports.deleteIssuedBook = async (req, res) => {
  try {
    const deletedBook = await issuebookmodel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Record deleted", data: deletedBook });
  } catch (error) {
  }
};

// search library
// Search issued books by student, regno, or bookname
exports.searchIssuedBooks = async (req, res) => {
  try {
    const { query, libraryid } = req.query;

    const searchQuery = {
      libraryid: libraryid,
      $or: [
        { student: { $regex: query, $options: "i" } },
        { regno: { $regex: query, $options: "i" } },
        { bookname: { $regex: query, $options: "i" } },
      ]
    };

    const result = await issuebookmodel.find(searchQuery).sort({ issuedate: -1 });
    return res.status(200).json({ data: result });
  } catch (error) {
  }
};



exports.searchStudentByRegno = async (req, res) => {
  try {
    const { regno } = req.query;

    const student = await User.findOne({ regno: regno.trim() });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
  }
};

// exports.addUser = async (req, res) => {
//   try {
//     const data = req.body;

//     // If it's an array -> bulk insert
//     if (Array.isArray(data)) {
//       const emails = data.map(user => user.email);

//       // Find existing users by email
//       const existingUsers = await User.find({ email: { $in: emails } });
//       const existingEmails = existingUsers.map(user => user.email);

//       // Filter out users with duplicate emails
//       const newUsers = data.filter(user => !existingEmails.includes(user.email));

//       if (newUsers.length === 0) {
//         return res.status(409).json({ message: "All users already exist with these emails", existingEmails });
//       }

//       // Insert non-duplicate users
//       const insertedUsers = await User.insertMany(newUsers);

//       return res.status(201).json({
//         message: `${insertedUsers.length} user(s) added successfully`,
//         insertedUsers,
//         skipped: existingEmails,
//       });
//     } 
//     // Else single user insert
//     else {
//       const existing = await User.findOne({ email: data.email });
//       if (existing) {
//         return res.status(409).json({ message: "User already exists with this email" });
//       }

//       const user = new User(data);
//       await user.save();

//       return res.status(201).json({ message: "User added successfully", user });
//     }
//   } catch (error) {
//   }
// };

exports.getSummary = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const [totalBooks, totalIssued, totalReturned, totalLost] = await Promise.all([
      bookmodel.countDocuments({ libraryid }),
      issuebookmodel.countDocuments({ libraryid }),
      issuebookmodel.countDocuments({ libraryid, issuestatus: "returned" }),
      issuebookmodel.countDocuments({ libraryid, issuestatus: "lost" }),
    ]);
    res.json({ totalBooks, totalIssued, totalReturned, totalLost });
  } catch (err) {
  }
};

// controllers/report/categoryCounts.js
exports.getCategoryCounts = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const result = await bookmodel.aggregate([
      { $match: { libraryid } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/languageCounts.js
exports.getLanguageCounts = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const result = await bookmodel.aggregate([
      { $match: { libraryid } },
      { $group: { _id: "$language", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/monthlyAdded.js
exports.getMonthlyAdded = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const result = await bookmodel.aggregate([
      { $match: { libraryid } },
      {
        $group: {
          _id: { month: { $month: "$addedDate" }, year: { $year: "$addedDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/issuedDaily.js
exports.getIssuedDaily = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const result = await issuebookmodel.aggregate([
      { $match: { libraryid, issuedate: { $gte: fromDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$issuedate" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/issuedMonthly.js
exports.getIssuedMonthly = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 6);

    const result = await issuebookmodel.aggregate([
      { $match: { libraryid, issuedate: { $gte: fromDate } } },
      {
        $group: {
          _id: {
            year: { $year: "$issuedate" },
            month: { $month: "$issuedate" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/statusBreakdown.js
exports.getStatusBreakdown = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const result = await issuebookmodel.aggregate([
      { $match: { libraryid } },
      { $group: { _id: "$issuestatus", count: { $sum: 1 } } }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/topBooks.js
exports.getTopBooks = async (req, res) => {
  const { libraryid } = req.query;
  try {
    const result = await issuebookmodel.aggregate([
      { $match: { libraryid } },
      {
        $group: {
          _id: "$bookname",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(result);
  } catch (err) {
  }
};

// controllers/report/libraryWise.js
exports.getLibraryWise = async (req, res) => {
  try {
    const [books, issued] = await Promise.all([
      bookmodel.aggregate([
        { $group: { _id: "$libraryname", count: { $sum: 1 } } }
      ]),
      issuebookmodel.aggregate([
        { $group: { _id: "$libraryname", count: { $sum: 1 } } }
      ])
    ]);
    res.json({ books, issued });
  } catch (err) {
  }
};

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





