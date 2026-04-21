const Placement = require("../Models/placement");
const Project = require("../Models/projects");
const User = require("../Models/user");
const Event = require("../Models/event");

// 1. Projects per year  (filtered by colid)
exports.projectsperyear = async (req, res) => {
  try {
    const data = await Project.aggregate([
    { $match: {colid: parseInt(req.query.colid)} },
    { $group: { _id: '$yop', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  return res.json(data);
  } catch (error) {
    console.log(error);
    
  }
};

// 2. Projects per month (of a given year, filtered by colid)
exports.projectspermonth = async (req, res) => {
  try {
    const year = req.query.year;
  const data = await Project.aggregate([
    { $match: { yop: year, colid: parseInt(req.query.colid) } },
    {
      $project: {
        month: { $substr: ['$createdAt', 5, 2] }
      }
    },
    { $group: { _id: '$month', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  return res.json(data);
  } catch (error) {
    console.log(error);    
  }
};

exports.projectsperdept = async (req, res) =>{
  try {
    const data = await Project.aggregate([
    { $match: { colid: Number(req.query.colid) } },
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
}

exports.projectspertype = async (req, res) =>{
  try {
    const data = await Project.aggregate([
    { $match: { colid: Number(req.query.colid) } },
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
}

exports.projectfundist = async (req, res) =>{
  try {
    const data = await Project.aggregate([
    { $match: { colid: Number(req.query.colid) } },
    {
      $bucket: {
        groupBy: '$funds',
        boundaries: [0, 5e5, 1e6, 2.5e6, 5e6, 1e7, 1e12],
        default: '> 1 Cr',
        output: { count: { $sum: 1 } }
      }
    }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
}
// 3. Placements per year  (filtered by colid)
exports.placementperyear = async (req, res) => {
  try {
    const data = await Placement.aggregate([
    { $match:{colid: parseInt(req.query.colid)} },
    { $group: { _id: '$year', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
};

// 4. Placements by program  (filtered by colid)
exports.placementsbyprogram = async (req, res) => {
  try {
    const data = await Placement.aggregate([
    { $match: {colid: parseInt(req.query.colid)} },
    { $group: { _id: '$programname', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
};

// 5. Placements by sector  (filtered by colid)
exports.placementbysector = async (req, res) => {
  try {
    const data = await Placement.aggregate([
    { $match: {colid: parseInt(req.query.colid)} },
    { $group: { _id: '$sector', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
};

// 6. Top employers  (filtered by colid)
exports.topemployers = async (req, res) => {
  try {
    const data = await Placement.aggregate([
    { $match: {colid: parseInt(req.query.colid)} },
    { $group: { _id: '$employername', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
};

// 7. Salary distribution  (filtered by colid)
exports.salarydistribution =  async (req, res) => {
  try {
    const buckets = [0, 3, 6, 10, 15, 25, 999];
  const data = await Placement.aggregate([
    { $match: {colid: parseInt(req.query.colid)} },
    {
      $bucket: {
        groupBy: { $divide: ['$salary', 100000] },
        boundaries: buckets,
        default: 'Other',
        output: { count: { $sum: 1 } }
      }
    }
  ]);
  return res.json(data);
  } catch (error) {
    
  }
};

exports.createproject = async (req, res) =>{
  try {
    const projects = Project.insertMany(req.body);
    return res.status(200).json(projects)
  } catch (error) {
    
  }
}

exports.createplacement = async (req, res) =>{
  try {
    const placement = Placement.insertMany(req.body);
    return res.status(200).json(placement);
  } catch (error) {
    
  }
}

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

exports.geteventreport = async (req, res) => {
  try {
    const { colid } = req.query;

    const now = new Date();

    const report = await Event.aggregate([
      { $match: { colid: parseInt(colid) } },

      {
        $facet: {
          byType: [
            { $group: { _id: "$type", count: { $sum: 1 } } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
          ],
          byDept: [
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
          ],
          timeline: [
            {
              $group: {
                _id: {
                  $cond: [{ $gte: ["$date", now] }, "Upcoming", "Past"]
                },
                count: { $sum: 1 }
              }
            },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
          ],
          events: [
            { $sort: { date: -1 } }, // Sort by date descending, optional
            { $project: { __v: 0 } } // Remove __v
          ]
        }
      }
    ]);

    const data = report[0];
    return res.json({
      totalEvents: data.events.length,
      byType: data.byType,
      byDept: data.byDept,
      timeline: data.timeline,
      events: data.events,
    });

  } catch (e) {
    console.error("Error generating event report:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.createevent = async (req, res) =>{
  try {
    const event = await Event.insertMany(req.body);
    return res.json(event);
  } catch (error) {
    
  }
}
