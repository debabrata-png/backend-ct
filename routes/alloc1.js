const express = require('express');
const router = express.Router();
const StudAlloc = require('../Models/studalloc1');

// Seed sample data
router.post('/seed', async (req, res) => {
  try {
    const count = parseInt(req.body.count || 100, 10);
    const docs = [];
    
    for (let i = 1; i <= count; i++) {
      docs.push({
        student: `Student ${i}`,
        region: `Region ${((i - 1) % 5) + 1}`,
        examode: i % 2 === 0 ? 'Online' : 'Offline',
        courseCode: `C${(100 + (i % 10))}`,
        course: `Course ${(i % 10) + 1}`
      });
    }
    
    await StudAlloc.insertMany(docs);
    res.json({ ok: true, inserted: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get all documents (for debug)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || 200, 10);
    const docs = await StudAlloc.find().limit(limit).lean();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get blank-faculty counts grouped by course
router.get('/available', async (req, res) => {
  const { colid, program, semester, examode, year, component } = req.query;
  //console.log('Available query:', req.query);
  
  try {
    const result = await StudAlloc.aggregate([
      { 
        $match: { 
          colid: parseInt(colid), 
          program : program, 
          semester : semester, 
          examode : examode, 
          year : year, 
          component: component,
          $or: [{ faculty: '' }, { faculty: null }] 
        } 
      },
      { $group: { _id: '$course', available: { $sum: 1 } } },
      { $project: { _id: 0, course: '$_id', available: 1 } }
    ]);
    
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Allocate specified number for a course
router.post('/allocate', async (req, res) => {
  try {
    const { course, colid, examode, count, program1, programcode, component } = req.body;
    
    if (!course || !count || count <= 0) {
      return res.status(400).json({ ok: false, error: 'Invalid input' });
    }
    
    // Find blank faculty records for that course
    const samples = await StudAlloc.aggregate([
      { 
        $match: { 
          course, 
          colid: parseInt(colid), 
          examode, 
          component,
          $or: [{ faculty: '' }, { faculty: null }] 
        } 
      },
      { $sample: { size: count } },
      { $project: { _id: 1 } }
    ]);
    
    const ids = samples.map(s => s._id);
    
    if (ids.length === 0) {
      return res.json({ ok: true, updated: 0, message: 'No blank records found' });
    }
    
    const result = await StudAlloc.updateMany(
      { _id: { $in: ids } },
      { $set: { faculty: program1, facultyid: programcode } }
    );
    
    res.json({ ok: true, updatedCount: result.modifiedCount || result.nModified || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
