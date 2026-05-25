const AdmissionBoardConfiguration = require('../Models/admissionboardconfiguration');

const text = (value) => String(value || '').trim();

const buildFilter = (query = {}) => {
  const filter = {};
  if (query.colid) filter.colid = Number(query.colid);
  if (query.level) filter.level = query.level;
  if (query.board) filter.board = query.board;
  if (query.isactive) filter.isactive = query.isactive;
  return filter;
};

exports.getBoardConfigurations = async (req, res) => {
  try {
    const data = await AdmissionBoardConfiguration.find(buildFilter(req.query)).sort({ level: 1, board: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createBoardConfiguration = async (req, res) => {
  try {
    const level = text(req.body.level);
    const board = text(req.body.board);
    if (!req.body.colid || !level || !board) {
      return res.status(400).json({ msg: 'Level and board/university are required' });
    }

    const data = await AdmissionBoardConfiguration.create({
      colid: Number(req.body.colid),
      level,
      board,
      isactive: req.body.isactive || 'Yes',
      user: req.body.user || ''
    });
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'This board/university already exists for the selected level' });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBoardConfiguration = async (req, res) => {
  try {
    const level = text(req.body.level);
    const board = text(req.body.board);
    if (!req.body.id || !req.body.colid || !level || !board) {
      return res.status(400).json({ msg: 'Level and board/university are required' });
    }

    const data = await AdmissionBoardConfiguration.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      {
        level,
        board,
        isactive: req.body.isactive || 'Yes',
        user: req.body.user || ''
      },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: 'This board/university already exists for the selected level' });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBoardConfiguration = async (req, res) => {
  try {
    await AdmissionBoardConfiguration.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkBoardConfigurations = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ msg: 'College id is required' });
    if (!items.length) return res.status(400).json({ msg: 'No rows received' });

    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const rowNumber = item.rowNumber || index + 2;
      const level = text(item.level || item.Level);
      const board = text(item.board || item.Board || item.University || item.university);
      if (!level || !board) {
        errors.push({ rowNumber, msg: 'Level and board/university are required' });
        continue;
      }
      try {
        await AdmissionBoardConfiguration.findOneAndUpdate(
          { colid, level, board },
          { colid, level, board, isactive: item.isactive || item.Active || 'Yes', user: req.body.user || '' },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }

    res.json({ saved, errors });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
