const BellExam = require('./../Models/rexammodel');

exports.bellCreateExam = async (req, res) => {
    const data = await BellExam.create(req.body);
    res.json(data);
};

exports.bellGetByColid = async (req, res) => {
    const data = await BellExam.find({ colid: req.body.colid });
    res.json(data);
};