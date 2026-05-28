const TranscriptMeeting = require('../Models/transcriptmeetingds');
const User = require('../Models/user');

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || '').trim();

const toDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const normalizeParticipants = (participants) => {
  const list = Array.isArray(participants) ? participants : [];
  const seen = new Set();
  return list
    .map((item) => ({
      name: text(item.name),
      email: text(item.email || item.user).toLowerCase(),
      role: text(item.role),
      department: text(item.department)
    }))
    .filter((item) => {
      if (!item.email || seen.has(item.email)) return false;
      seen.add(item.email);
      return true;
    });
};

exports.searchUsers = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const q = text(req.query.q);
    const filter = { colid };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { department: { $regex: q, $options: 'i' } }
      ];
    }
    const users = await User.find(filter)
      .select('name email role department phone')
      .sort({ name: 1, email: 1 })
      .limit(100)
      .lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const filter = { colid };
    const start = toDate(req.query.start);
    const end = toDate(req.query.end);
    if (start || end) {
      filter.startDateTime = {};
      if (start) filter.startDateTime.$gte = start;
      if (end) filter.startDateTime.$lte = end;
    }

    const email = text(req.query.email || req.query.user).toLowerCase();
    if (String(req.query.my || '').toLowerCase() === 'yes' && email) {
      filter.$or = [
        { hostEmail: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } },
        { participantEmails: email }
      ];
    }

    const meetings = await TranscriptMeeting.find(filter).sort({ startDateTime: 1 }).lean();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMeeting = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const meeting = await TranscriptMeeting.findOne({ _id: req.query.id, colid }).lean();
    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.saveMeeting = async (req, res) => {
  try {
    const body = req.body || {};
    const colid = toNumber(body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });

    const startDateTime = toDate(body.startDateTime);
    const endDateTime = toDate(body.endDateTime);
    if (!startDateTime || !endDateTime) return res.status(400).json({ msg: 'Valid start and end date time are required' });
    if (endDateTime <= startDateTime) return res.status(400).json({ msg: 'End time should be after start time' });

    const participants = normalizeParticipants(body.participants);
    const payload = {
      colid,
      hostName: text(body.hostName),
      hostEmail: text(body.hostEmail).toLowerCase(),
      topic: text(body.topic),
      description: text(body.description),
      meetingLink: text(body.meetingLink),
      startDateTime,
      endDateTime,
      participants,
      participantEmails: participants.map((item) => item.email),
      createdBy: text(body.createdBy || body.user)
    };

    if (!payload.hostName) return res.status(400).json({ msg: 'Host name is required' });
    if (!payload.hostEmail) return res.status(400).json({ msg: 'Host email is required' });
    if (!payload.topic) return res.status(400).json({ msg: 'Topic is required' });

    let saved;
    if (body.id) {
      saved = await TranscriptMeeting.findOneAndUpdate(
        { _id: body.id, colid },
        payload,
        { new: true, runValidators: true }
      );
      if (!saved) return res.status(404).json({ msg: 'Meeting not found' });
    } else {
      saved = await TranscriptMeeting.create(payload);
    }
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ msg: 'colid is required' });
    const deleted = await TranscriptMeeting.findOneAndDelete({ _id: req.body.id, colid });
    if (!deleted) return res.status(404).json({ msg: 'Meeting not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
