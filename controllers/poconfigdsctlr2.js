const poconfigds2 = require('../Models/poconfigds2');

exports.addpoconfigds2 = async (req, res) => {
    try {
        const { colid } = req.body;
        // Typically only one config per college? Or multiple? Let's assume one active or we just add new.
        // Let's allow strictly one per colid for simplicity or just standard list.
        // User asked for "a model... and use it".
        const newDoc = new poconfigds2(req.body);
        await newDoc.save();
        res.status(200).send({ message: 'Added Successfully', data: newDoc });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getpoconfigds2 = async (req, res) => {
    try {
        const { colid } = req.query;
        const config = await poconfigds2.findOne({ colid }).sort({ createdAt: -1 }); // Get latest
        res.status(200).send({ message: 'Success', data: config });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updatepoconfigds2 = async (req, res) => {
    try {
        const { id } = req.query;
        await poconfigds2.findByIdAndUpdate(id, req.body);
        res.status(200).send({ message: 'Updated Successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
