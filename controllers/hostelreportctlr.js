const hostelmodel = require("../Models/hostelmodel");
const hostelroommodel = require("../Models/hostelroommodel");
const hostelbedallocation = require("../Models/hostelbedallocation");

exports.getHostelSummary = async (req, res) => {
  try {
    const { colid } = req.query;
    const colidNum = parseInt(colid);

    const [buildingCount, summary] = await Promise.all([
      // Use 'buldingname' here because of production typo
      hostelmodel.countDocuments({ colid: colidNum, buldingname: { $exists: true } }),

      hostelroommodel.aggregate([
        { $match: { colid: colidNum } },
        {
          $facet: {
            totals: [
              {
                $group: {
                  _id: null,
                  totalRooms: { $sum: 1 },
                  totalBeds: { $sum: "$totalbeds" }
                }
              }
            ],
            seaters: [
              {
                $group: {
                  _id: "$totalbeds",
                  count: { $sum: 1 }
                }
              }
            ]
          }
        }
      ])
    ]);

    const occupiedBeds = await hostelbedallocation.countDocuments({ colid: colidNum });

    const totals = summary[0]?.totals[0] || { totalRooms: 0, totalBeds: 0 };
    const seaters = summary[0]?.seaters || [];

    return res.json({
      totalBuildings: buildingCount,
      totalRooms: totals.totalRooms,
      totalBeds: totals.totalBeds,
      occupiedBeds,
      bedsAvailable: totals.totalBeds - occupiedBeds,
      seaterGroups: seaters.reduce((acc, s) => {
        acc[s._id] = s.count;
        return acc;
      }, {})
    });

  } catch (e) {
  }
};


exports.getBuildingReport = async (req, res) => {
  try {
    const { colid } = req.query;

    const buildingStats = await hostelroommodel.aggregate([
      { $match: { colid: parseInt(colid) } },
      {
        $lookup: {
          from: "hostelbedallocations", // <- collection name (lowercase pluralized)
          let: { building: "$buildingname", room: "$roomname", colid: "$colid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$buildingname", "$$building"] },
                    { $eq: ["$roomname", "$$room"] },
                    { $eq: ["$colid", "$$colid"] }
                  ]
                }
              }
            },
            { $count: "occupiedCount" }
          ],
          as: "allocations"
        }
      },
      {
        $addFields: {
          occupiedBeds: {
            $cond: [
              { $gt: [{ $size: "$allocations" }, 0] },
              { $arrayElemAt: ["$allocations.occupiedCount", 0] },
              0
            ]
          }
        }
      },
      {
        $group: {
          _id: "$buildingname",
          rooms: { $sum: 1 },
          totalBeds: { $sum: "$totalbeds" },
          occupiedBeds: { $sum: "$occupiedBeds" }
        }
      },
      {
        $project: {
          _id: 0,
          building: "$_id",
          rooms: 1,
          totalBeds: 1,
          occupiedBeds: 1,
          availableBeds: { $subtract: ["$totalBeds", "$occupiedBeds"] }
        }
      },
      { $sort: { building: 1 } }
    ]);

    return res.json(buildingStats);
  } catch (e) {
  }
};