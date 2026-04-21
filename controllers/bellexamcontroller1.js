const BellExam = require('./../Models/bellexammodel1');

exports.bellCreateExam = async (req, res) => {
    const data = await BellExam.create(req.body);
    res.json(data);
};

exports.bellGetByColid = async (req, res) => {
    const { colid } = req.body;
    const data = await BellExam.find({ colid });
    res.json(data);
};