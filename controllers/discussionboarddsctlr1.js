const discussiontopicds1 = require("../Models/discussiontopicds1");
const discussionpostsds1 = require("../Models/discussionpostsds1");
const User = require("../Models/user");
const topiccategoryds1 = require("../Models/topiccategoryds1");

// ==================== DISCUSSION TOPICS CRUD ====================

// Create Discussion Topic
exports.creatediscussiontopic1ds = async (req, res) => {
    try {
        const { name, user, colid, topicname, category } = req.body;

        const newTopic = await discussiontopicds1.create({
            name,
            user,
            colid,
            topicname,
            category
        });

        return res.status(200).json({
            success: true,
            message: "Discussion topic created successfully",
            data: newTopic
        });
    } catch (error) {
    }
};

// Get Discussion Topics
// Updated getdiscussiontopics1ds function
exports.getdiscussiontopics1ds = async (req, res) => {
    try {
        const { colid, category } = req.query;

        let filter = { colid: parseInt(colid) };
        
        // Add category filter if provided
        if (category) {
            filter.category = category;
        }

        const topics = await discussiontopicds1.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Discussion topics retrieved successfully",
            data: topics
        });
    } catch (error) {
    }
};

// Update Discussion Topic
exports.updatediscussiontopic1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const { name, user, topicname, category } = req.body;

        const updatedTopic = await discussiontopicds1.findOneAndUpdate(
            { _id: id, colid: parseInt(colid) },
            {
                name,
                user,
                topicname,
                category
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
exports.deletediscussiontopic1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        await discussiontopicds1.findOneAndDelete({
            _id: id,
            colid: parseInt(colid)
        });

        // Also delete all posts related to this topic
        await discussionpostsds1.deleteMany({
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

// Search Discussion Topics
// Simplified Search Discussion Topics function
exports.searchdiscussiontopics1ds = async (req, res) => {
    try {
        const { colid, searchterm, category } = req.query;

        const searchRegex = new RegExp(searchterm.trim(), 'i');

        let filter = {
            colid: parseInt(colid),
            category: category,
            $or: [
                { topicname: searchRegex },
                { name: searchRegex },
                { user: searchRegex }
            ]
        };

        const topics = await discussiontopicds1.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: `Found ${topics.length} topics matching "${searchterm}" in category "${category}"`,
            data: topics,
            searchterm: searchterm,
            category: category
        });
    } catch (error) {
    }
};

// ==================== DISCUSSION POSTS CRUD ====================

// Create Discussion Post
exports.creatediscussionpost1ds = async (req, res) => {
    try {
        const { name, user, colid, topicid, postdescription } = req.body;
        const newPost = await discussionpostsds1.create({
            name,
            user,
            colid,
            topicid,
            postdescription
        });

        return res.status(200).json({
            success: true,
            message: "Discussion post created successfully",
            data: newPost
        });
    } catch (error) {
    }
};

// Get Discussion Posts
exports.getdiscussionposts1ds = async (req, res) => {
    try {
        const { colid, topicid } = req.query;

        let filter = { colid: parseInt(colid) };

        if (topicid) filter.topicid = topicid;

        const posts = await discussionpostsds1.find(filter)
            .populate('topicid', 'topicname description')
            .sort({ createdAt: 1 }); // Ascending order (oldest first)

        return res.status(200).json({
            success: true,
            message: "Discussion posts retrieved successfully",
            data: posts
        });
    } catch (error) {
    }
};

// Update Discussion Post
exports.updatediscussionpost1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const { name, user, postdescription } = req.body;

        const updatedPost = await discussionpostsds1.findOneAndUpdate(
            { _id: id, colid: parseInt(colid) },
            {
                name,
                user,
                postdescription
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
exports.deletediscussionpost1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        await discussionpostsds1.findOneAndDelete({
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

// Create Topic Category
exports.createtopiccategory1ds = async (req, res) => {
    try {
        const { name, user, colid, categoryname } = req.body;

        const newCategory = new topiccategoryds1({
            name,
            user,
            colid,
            categoryname
        });

        const savedCategory = await newCategory.save();

        return res.status(200).json({
            success: true,
            message: "Topic category created successfully",
            data: savedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating topic category',
            error: error.message
        });
    }
};

// Get Topic Categories
exports.gettopiccategories1ds = async (req, res) => {
    try {
        const { colid } = req.query;

        let filter = { colid: parseInt(colid) };

        const categories = await topiccategoryds1.find(filter).sort({ categoryname: 1 });

        return res.status(200).json({
            success: true,
            message: "Topic categories retrieved successfully",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving topic categories',
            error: error.message
        });
    }
};

// Update Topic Category
exports.updatetopiccategory1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;
        const { name, user, categoryname } = req.body;

        const updatedCategory = await topiccategoryds1.findOneAndUpdate(
            { _id: id, colid: parseInt(colid) },
            {
                name,
                user,
                categoryname
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Topic category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Topic category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating topic category',
            error: error.message
        });
    }
};

// Delete Topic Category
exports.deletetopiccategory1ds = async (req, res) => {
    try {
        const { id, colid } = req.query;

        const deletedCategory = await topiccategoryds1.findOneAndDelete({
            _id: id,
            colid: parseInt(colid)
        });

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Topic category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Topic category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting topic category',
            error: error.message
        });
    }
};

// Search Topic Categories
exports.searchtopiccategories1ds = async (req, res) => {
    try {
        const { colid, searchterm } = req.query;

        if (!searchterm || searchterm.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search term is required"
            });
        }

        const searchRegex = new RegExp(searchterm.trim(), 'i');

        const filter = {
            colid: parseInt(colid),
            $or: [
                { categoryname: searchRegex },
                { name: searchRegex },
                { user: searchRegex }
            ]
        };

        const categories = await topiccategoryds1.find(filter).sort({ categoryname: 1 });

        return res.status(200).json({
            success: true,
            message: `Found ${categories.length} categories matching "${searchterm}"`,
            data: categories,
            searchterm: searchterm
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching topic categories',
            error: error.message
        });
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