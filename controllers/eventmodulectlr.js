const User = require("../Models/user");
const eventsnew1 = require("../Models/eventsnew1");
const eventregistration = require("../Models/eventregistration");
const eventdocs = require("../Models/eventdocs");

exports.createevent = async (req, res) => {
  try {
    const event = await eventsnew1.insertMany(req.body);
    return res.json(event);
  } catch (error) {
  }
}

exports.getevents = async (req, res) => {
  try {
    const { colid } = req.query;
    const events = await eventsnew1.find({
      colid: parseInt(colid)
    }).sort({startdate:-1});
    return res.json(events);
  } catch (error) {
  }
}

exports.geteventsuser = async (req, res) => {
  try {
    const { colid } = req.query;
    const events = await eventsnew1.find({
      colid: parseInt(colid),user: req.query.user
    }).sort({startdate:-1});
    return res.json(events);
  } catch (error) {
  }
}

exports.getsingleevent = async (req, res) => {
  try {
    const event = await eventsnew1.findById(req.query.id);
    return res.json(event);
  } catch (error) {
  }
};

exports.eventregister = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = 'attendee',
      colid,
      institutionname,
      phone,
      topic,
      speakerprofile,
      designation,
    } = req.body;

    const exists = await eventregistration.findOne({ email, eventid: req.query.id });
    if (exists) return res.json({ message: 'Already registered' });

    // auto-approve attendee, keep speaker pending
    const status1 = role === 'attendee' ? 'Approved' : 'Pending';

    const payload = {
      name,
      email,
      password,
      eventid: req.query.id,
      role,
      status1,
      colid: parseInt(colid),
      ...(role === 'speaker'
        ? { institutionname, phone, topic, speakerprofile, designation } // speaker-only fields
        : { institutionname, phone }),                     // attendee fields
    };

    const reg = await eventregistration.create(payload);
    return res.status(201).json(reg);
  } catch (error) {
  }
};

exports.eventlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = await eventregistration.findOne({
      email,
      eventid: req.query.id,
      status1: 'Approved', // only approved users can enter
    });

    if (!reg || reg.password !== password)
      return res.status(401).json({ message: 'Invalid credentials / not approved' });

    return res.json({ user: reg });
  } catch (error) {
  }
};

exports.getspeakers = async (req, res) => {
  try {
    const { eventid, colid } = req.query;
    const speakers = await eventregistration.find({
      eventid,
      colid: Number(colid),
      role: 'speaker',
    }).select('-password');
    return res.json(speakers);
  } catch (err) {
  }
};

exports.getapprovedspeakers = async (req, res) => {
  try {
    const { eventid, colid } = req.query;
    const speakers = await eventregistration.find({
      eventid,
      colid: Number(colid),
      role: 'speaker',
      status1: 'Approved',
    }).select('-password');
    return res.json(speakers);
  } catch (err) {
  }
};

/* PATCH /api/v2/approve-speaker?id=xxx */
exports.approvespeaker = async (req, res) => {
  try {
    const { id } = req.query;
    const { day, date, time } = req.body;

    const updated = await eventregistration.findByIdAndUpdate(
      id,
      { status1: 'Approved', day, date, time },
      { new: true }
    );
    return res.json(updated);
  } catch (err) {
  }
};

exports.getDocs = async (req, res) => {
  try {
    const docs = await eventdocs.find({ eventid: req.query.id,
      colid: parseInt(req.query.colid)
     });
    return res.json(docs);
  } catch (error) {
  }
};

/*  POST /api/v2/event/:id/docs  */
exports.addDoc = async (req, res) => {
  try {
    const { title, link } = req.body;
    const { id, colid } = req.query;
    const { regId } = req.body;        // expect client to send regId

    const reg = await eventregistration.findById(regId);
    if (!reg || reg.role !== 'speaker')
      return res.status(403).json({ message: 'Only speakers allowed' });

    const doc = await eventdocs.create({
      eventid: id, title, link, uploadedBy: regId, colid: parseInt(colid)    });
    return res.status(201).json(doc);
  } catch (error) {
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const { colid, name, email: userEmail, regno, role } = user;

    return res.status(200).json({ colid, name, email: userEmail, regno, role });
  } catch (err) { }
}