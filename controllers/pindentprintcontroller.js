const Indent = require("./../Models/pindent");

exports.getIndentUsersForPrint = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const users = await Indent.aggregate([
      {
        $match: {
          colid: Number(colid),
          user: { $exists: true, $nin: [null, ""] }
        }
      },
      {
        $group: {
          _id: "$user",
          name: { $first: "$name" },
          department: { $first: "$department" },
          institution: { $first: "$institution" },
          count: { $sum: 1 }
        }
      },
      { $sort: { name: 1, _id: 1 } }
    ]);

    res.json(users.map((item) => ({
      user: item._id,
      name: item.name || item._id,
      department: item.department || "",
      institution: item.institution || "",
      count: item.count
    })));
  } catch (error) {
    res.status(500).json({ message: "Error loading indent users", error: error.message });
  }
};

exports.getIndentsByUserForPrint = async (req, res) => {
  try {
    const { colid, user, status } = req.query;

    if (!colid || !user) {
      return res.status(400).json({ message: "colid and user are required" });
    }

    const query = {
      colid: Number(colid),
      user
    };

    if (status && status !== "ALL") {
      query.status = status;
    }

    const data = await Indent.find(query)
      .populate("storeid")
      .populate("categoryid")
      .populate("budgetid")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error loading indents", error: error.message });
  }
};
