const RFP = require("./../Models/prfp");

exports.getPrintableRFPList = async (req, res) => {
  try {
    const { colid, status } = req.query;

    if (!colid) {
      return res.status(400).json({ message: "colid is required" });
    }

    const query = { colid: Number(colid) };
    if (status && status !== "ALL") {
      query.status = status;
    }

    const data = await RFP.find(query)
      .select("title creatorname status createdAt expirydate")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error loading RFPs", error: error.message });
  }
};

exports.getPrintableRFPById = async (req, res) => {
  try {
    const { id, colid } = req.query;

    if (!id || !colid) {
      return res.status(400).json({ message: "id and colid are required" });
    }

    const data = await RFP.findOne({ _id: id, colid: Number(colid) })
      .populate("storeid")
      .populate("categoryid");

    if (!data) {
      return res.status(404).json({ message: "RFP not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error loading RFP details", error: error.message });
  }
};
