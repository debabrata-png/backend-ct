const Document = require('../Models/alumnidocumentsds');
const User = require('../Models/user');

// Upload Document
exports.uploadalumnidocumentsds = async (req, res) => {
    try {
        const { colid, email, documentName, documentType, fileUrl, description } = req.body;

        // Validate required fields
        if (!fileUrl) return res.status(400).json({ message: 'File URL is required' });

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newDoc = new Document({
            documentName,
            documentType,
            fileUrl,
            description,
            colid: Number(colid),
            alumniId: user._id
        });

        await newDoc.save();
        res.status(201).json({ message: 'Document uploaded', document: newDoc });
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

// Get My Documents
exports.getmydocumentsds = async (req, res) => {
    try {
        const { colid, email } = req.body;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const docs = await Document.find({ alumniId: user._id, colid: Number(colid), status: 1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
};

// Get Single Document
exports.getsinglealumnidocds = async (req, res) => {
    try {
        const { id, colid, email } = req.query;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const doc = await Document.findOne({ _id: id, alumniId: user._id, colid: Number(colid) });
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document', error: error.message });
    }
};

// Delete Document
exports.deletealumnidocumentsds = async (req, res) => {
    try {
        const { id, colid, email } = req.query;

        // Find user by colid and email
        const user = await User.findOne({ colid: Number(colid), email, status: 1 });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Document.findOneAndUpdate({ _id: id, alumniId: user._id, colid: Number(colid) }, { status: 0 });
        res.status(200).json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
};
