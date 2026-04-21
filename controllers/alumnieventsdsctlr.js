const Event = require('../Models/alumnieventsds');
const Registration = require('../Models/alumnieventsregds');
const User = require('../Models/user');

// Create Event (Admin)
exports.createalumnieventsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const newEvent = new Event({ ...req.body, colid: Number(colid) });
        await newEvent.save();

        // TODO: Trigger email notification to all alumni
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get All Events
exports.getallalumnieventsds = async (req, res) => {
    try {
        const { colid } = req.query;
        const events = await Event.find({ colid: Number(colid), status: 1 }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get Upcoming Events
exports.getupcomingeventsds = async (req, res) => {
    try {
        const { colid } = req.body;
        const events = await Event.find({ colid: Number(colid), date: { $gte: new Date() }, status: 1 }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming events', error: error.message });
    }
};

// Get Past Events
exports.getpasteventds = async (req, res) => {
    try {
        const { colid } = req.body;
        const events = await Event.find({ colid: Number(colid), date: { $lt: new Date() }, status: 1 }).sort({ date: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching past events', error: error.message });
    }
};

// Get Single Event
exports.getsingleeventds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const event = await Event.findOne({ _id: id, colid: Number(colid) });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Update Event
exports.updatealumnieventsds = async (req, res) => {
    try {
        const { id, colid, ...updateData } = req.body;
        const event = await Event.findOneAndUpdate(
            { _id: id, colid: Number(colid) },
            { ...updateData, colid: Number(colid) },
            { new: true }
        );
        res.status(200).json({ message: 'Event updated', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete Event
exports.deletealumnieventsds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        await Event.findOneAndUpdate(
            { _id: id, colid: Number(colid) },
            { status: 0 }
        );
        res.status(200).json({ message: 'Event deleted (soft)' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

// Register for Event
exports.registerforeventds = async (req, res) => {
    try {
        const { eventId, colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if already registered
        const existingReg = await Registration.findOne({ alumniId: user._id, eventId });
        if (existingReg) {
            return res.status(400).json({ message: 'Already registered' });
        }

        const registration = new Registration({ alumniId: user._id, eventId });
        await registration.save();

        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Get Registrations (Admin)
exports.geteventregistrationsds = async (req, res) => {
    try {
        const { eventId } = req.query;
        const registrations = await Registration.find({ eventId })
            .populate('alumniId', 'name email phone');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching registrations', error: error.message });
    }
};

// Get My Registrations (Alumni)
exports.getmyeventregistrationsds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, role: 'Alumni', status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const registrations = await Registration.find({ alumniId: user._id })
            .populate('eventId', 'name date venue type');

        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your registrations', error: error.message });
    }
};

// Mark Attendance
exports.markattendanceds = async (req, res) => {
    try {
        const { registrationId, status } = req.body; // status: true/false
        await Registration.findByIdAndUpdate(registrationId, { attendanceStatus: status });
        res.status(200).json({ message: 'Attendance updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
};
