const poconfigds = require('../Models/poconfigds');

exports.addpoconfigds = async (req, res) => {
    try {
        const { colid } = req.body;
        // Typically only one config per college? Or multiple? Let's assume one active or we just add new.
        // Let's allow strictly one per colid for simplicity or just standard list.
        // User asked for "a model... and use it".
        const newDoc = new poconfigds(req.body);
        await newDoc.save();
        res.status(200).send({ message: 'Added Successfully', data: newDoc });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getpoconfigds = async (req, res) => {
    try {
        const { colid } = req.query;
        const config = await poconfigds.findOne({ colid }).sort({ createdAt: -1 }); // Get latest
        res.status(200).send({ message: 'Success', data: config });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updatepoconfigds = async (req, res) => {
    try {
        const { id } = req.query;
        await poconfigds.findByIdAndUpdate(id, req.body);
        res.status(200).send({ message: 'Updated Successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
