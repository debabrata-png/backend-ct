const User = require("../Models/user");

const buildAdminQuery = (colid, search) => {
  const query = {
    role: /^admin$/i
  };

  if (colid !== undefined && colid !== null && String(colid).trim() !== "") {
    query.colid = Number(colid);
  }

  if (search && String(search).trim() !== "") {
    const text = String(search).trim();
    query.$or = [
      { name: { $regex: text, $options: "i" } },
      { email: { $regex: text, $options: "i" } },
      { phone: { $regex: text, $options: "i" } },
      { regno: { $regex: text, $options: "i" } }
    ];
  }

  return query;
};

exports.getAdminUsersForPasswordds = async (req, res) => {
  try {
    const { colid, search } = req.query;

    if (!colid) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const users = await User.find(buildAdminQuery(colid, search))
      .select("name email phone role regno department institution colid status")
      .sort({ name: 1, email: 1 })
      .lean();

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admin users",
      error: error.message
    });
  }
};

exports.getAdminUserPasswordds = async (req, res) => {
  try {
    const { id, colid } = req.query;

    if (!id || !colid) {
      return res.status(400).json({ success: false, message: "id and colid are required" });
    }

    const user = await User.findOne({
      _id: id,
      colid: Number(colid),
      role: /^admin$/i
    })
      .select("name email password role colid")
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "Admin user not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching admin user password",
      error: error.message
    });
  }
};

exports.updateAdminUserPasswordds = async (req, res) => {
  try {
    const { id, colid, password } = req.body;

    if (!id || !colid || !password || String(password).trim() === "") {
      return res.status(400).json({
        success: false,
        message: "id, colid and password are required"
      });
    }

    const user = await User.findOneAndUpdate(
      {
        _id: id,
        colid: Number(colid),
        role: /^admin$/i
      },
      { password: String(password) },
      { new: true, runValidators: true }
    )
      .select("name email password role colid")
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "Admin user not found" });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating admin user password",
      error: error.message
    });
  }
};
