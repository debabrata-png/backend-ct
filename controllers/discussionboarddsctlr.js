const User = require("../Models/user");
const discussiontopicds = require("../Models/discussiontopicds");
const discussionpostsds = require("../Models/discussionpostsds");

// ==================== DISCUSSION TOPICS CRUD ====================

// Create Discussion Topic
exports.creatediscussiontopicds = async (req, res) => {
    try {
        const { name, user, colid, topicname, description, programcode, coursecode, year, semester } = req.body;

        const newTopic = await discussiontopicds.create({
            name,
            user,
            colid,
            topicname,
            description,
            programcode,
            coursecode,
            year,
            semester
        });

        return res.status(200).json({
            success: true,
            message: "Discussion topic created successfully",
            data: newTopic
        });
    } catch (error) {
    }
};

// Get Discussion Topics with Filters
exports.getdiscussiontopicsds = async (req, res) => {
    try {
        const { colid, programcode, coursecode, year, semester } = req.query;

        let filter = { colid: parseInt(colid) };

        if (programcode) filter.programcode = programcode;
        if (coursecode) filter.coursecode = coursecode;
        if (year) filter.year = year;
        if (semester) filter.semester = semester;

        const topics = await discussiontopicds.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Discussion topics retrieved successfully",
            data: topics
        });
    } catch (error) {
    }
};

// Update Discussion Topic
exports.updatediscussiontopicds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const { name, user, topicname, description, programcode, coursecode, year, semester } = req.body;

        const updatedTopic = await discussiontopicds.findOneAndUpdate(
            { _id: id, colid: parseInt(colid) },
            {
                name,
                user,
                topicname,
                description,
                programcode,
                coursecode,
                year,
                semester
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Discussion topic updated successfully",
            data: updatedTopic
        });
    } catch (error) {
    }
};

// Delete Discussion Topic
exports.deletediscussiontopicds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        await discussiontopicds.findOneAndDelete({
            _id: id,
            colid: parseInt(colid)
        });

        // Also delete all posts related to this topic
        await discussionpostsds.deleteMany({
            topicid: id,
            colid: parseInt(colid)
        });

        return res.status(200).json({
            success: true,
            message: "Discussion topic and related posts deleted successfully"
        });
    } catch (error) {
    }
};

// ==================== DISCUSSION POSTS CRUD ====================

// Create Discussion Post
exports.creatediscussionpostds = async (req, res) => {
    try {
        const { name, user, colid, topicid, postdescription, programcode, coursecode, year, semester } = req.body;

        const newPost = await discussionpostsds.create({
            name,
            user,
            colid,
            topicid,
            postdescription,
            programcode,
            coursecode,
            year,
            semester
        });

        return res.status(200).json({
            success: true,
            message: "Discussion post created successfully",
            data: newPost
        });
    } catch (error) {
    }
};

// Get Discussion Posts with Filters
exports.getdiscussionpostsds = async (req, res) => {
    try {
        const { colid, topicid, programcode, coursecode, year, semester } = req.query;

        let filter = { colid: parseInt(colid) };

        if (topicid) filter.topicid = topicid;
        if (programcode) filter.programcode = programcode;
        if (coursecode) filter.coursecode = coursecode;
        if (year) filter.year = year;
        if (semester) filter.semester = semester;

        const posts = await discussionpostsds.find(filter)
            .populate('topicid', 'topicname description')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Discussion posts retrieved successfully",
            data: posts
        });
    } catch (error) {
    }
};

// Update Discussion Post
exports.updatediscussionpostds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const { name, user, postdescription, programcode, coursecode, year, semester } = req.body;

        const updatedPost = await discussionpostsds.findOneAndUpdate(
            { _id: id, colid: parseInt(colid) },
            {
                name,
                user,
                postdescription,
                programcode,
                coursecode,
                year,
                semester
            },
            { new: true }
        ).populate('topicid', 'topicname description');

        return res.status(200).json({
            success: true,
            message: "Discussion post updated successfully",
            data: updatedPost
        });
    } catch (error) {
    }
};

// Delete Discussion Post
exports.deletediscussionpostds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        await discussionpostsds.findOneAndDelete({
            _id: id,
            colid: parseInt(colid)
        });

        return res.status(200).json({
            success: true,
            message: "Discussion post deleted successfully"
        });
    } catch (error) {
    }
};


// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { colid, name, email: userEmail, regno, role, user: username } = user;

        return res.status(200).json({ 
            colid, 
            name, 
            email: userEmail, 
            regno, 
            role,
            user: username
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Login error',
            error: error.message 
        });
    }
};