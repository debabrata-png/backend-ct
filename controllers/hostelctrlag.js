const HostelMaster  = require("../Models/hostelmodelag");

const createHostel = async (req, res) => {
  try {
    const data = await HostelMaster.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Create failed" });
  }
};
const bulkUploadHostel = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).json({ message: "Empty data" });
    }

    const formattedData = req.body.map(row => ({
      colid: row.colid,
      hostelName: row.HOSTEL_NAME || "",
      hostelAddress: row.HOSTEL_ADDRESS || "",
      hostelType: row.HOSTEL_TYPE || "",
      blockCode: row.BLOCK_CODE || "",
      blockName: row.BLOCK_NAME || "",
      floorCode: row.FLOOR_CODE || "",
      floorName: row.FLOOR_NAME || "",
      roomName: row.ROOM_NAME || "",
      roomType: row.ROOM_TYPE || "",
      roomCapacity: Number(row.ROOM_CAPACITY) || 0,
      residentType: row.RESIDENT_TYPE || ""
    }));

    const result = await HostelMaster.insertMany(formattedData);

    res.json({
      success: true,
      insertedCount: result.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bulk upload failed", error: error.message });
  }
};

 

const getAllHostels = async (req, res) => {
  try {
    const { colid, page, limit, search } = req.query;
    let query = {};
    if (colid) {
      query.colid = colid;
    }

 
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapedSearch, "i");
      query.$or = [
        { hostelName: searchRegex },
        { hostelType: searchRegex },
        { blockName: searchRegex },
        { floorName: searchRegex },
        { roomName: searchRegex },
        { residentType: searchRegex }
      ];
    }
    if (page) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      const skip = (pageNum - 1) * limitNum;

      const totalCount = await HostelMaster.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limitNum);

      const data = await HostelMaster.find(query)
        .skip(skip)
        .limit(limitNum);

      res.json({
        data,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: totalCount,
          itemsPerPage: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1
        }
      });
    } else {
 
      const data = await HostelMaster.find(query);
      res.json({
        data,
        totalItems: data.length
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch failed" });
  }
};
const getAllHostelsNoPagination = async (req, res) => {
  try {
    const colid = req.query.colid;            
    const query = { colid };                

    const data = await HostelMaster.find(query).lean();

    res.json({
      data,
      totalItems: data.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch failed" });
  }
};

const getHostelById = async (req, res) => {
  try {
    const data = await HostelMaster.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch failed" });
  }
};

const updateHostel = async (req, res) => {
  try {
    const updated = await HostelMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};
 

const deleteHostel = async (req, res) => {
  try {
    await HostelMaster.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

const deleteAllHostels = async (req, res) => {
  try {
    await HostelMaster.deleteMany({});
    res.json({ message: "All records deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

 

const XLSX = require("xlsx");

const downloadReport = async (req, res) => {
  try {
    const data = await HostelMaster.find({}).lean();

    if (!data.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const excelData = data.map(d => ({
      HOSTEL_NAME: d.hostelName || "",
      HOSTEL_ADDRESS: d.hostelAddress || "",
      HOSTEL_TYPE: d.hostelType || "",
      BLOCK_CODE: d.blockCode || "",
      BLOCK_NAME: d.blockName || "",
      FLOOR_CODE: d.floorCode || "",
      FLOOR_NAME: d.floorName || "",
      ROOM_NAME: d.roomName || "",
      ROOM_TYPE: d.roomType || "",
      ROOM_CAPACITY: d.roomCapacity || 0,
      RESIDENT_TYPE: d.residentType || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hostel Master Report");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Hostel_Master_Report.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("Excel report error:", error);
    res.status(500).json({ message: "Report failed" });
  }
};

 

module.exports = {
  createHostel,
  bulkUploadHostel,
  getAllHostels,
  getAllHostelsNoPagination,
  getHostelById,
  updateHostel,
  deleteHostel,
  deleteAllHostels,
  downloadReport
};