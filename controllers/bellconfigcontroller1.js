const BellConfig = require('./../Models/bellconfigmodel1');

exports.bellSaveConfig = async (req, res) => {
    const { colid } = req.body;

    let config = await BellConfig.findOne({ colid });

    if (config) {
        config = await BellConfig.findOneAndUpdate(
            { colid },
            req.body,
            { new: true }
        );
    } else {
        config = await BellConfig.create(req.body);
    }

    res.json(config);
};

exports.bellGetConfig = async (req, res) => {
    const { colid } = req.body;
    const config = await BellConfig.findOne({ colid });
    res.json(config);
};

// ✅ AUTO BANDS
exports.bellAutoGenerateBands = async (req, res) => {
    const { colid } = req.body;

    const bands = [
        { grade: 'O',  minZ: 1.5,  maxZ: 100,  gradepoint: 10 },
        { grade: 'A+', minZ: 1.0,  maxZ: 1.5,  gradepoint: 9 },
        { grade: 'A',  minZ: 0.5,  maxZ: 1.0,  gradepoint: 8 },
        { grade: 'B+', minZ: 0.0,  maxZ: 0.5,  gradepoint: 7 },
        { grade: 'B',  minZ: -0.5, maxZ: 0.0,  gradepoint: 6 },
        { grade: 'C',  minZ: -1.0, maxZ: -0.5, gradepoint: 5 },
        { grade: 'P',  minZ: -1.5, maxZ: -1.0, gradepoint: 4 },
        { grade: 'F',  minZ: -100, maxZ: -1.5, gradepoint: 0 }
    ];

    let config = await BellConfig.findOne({ colid });

    if (!config) {
        config = await BellConfig.create({ colid, grades: bands });
    } else {
        config.grades = bands;
        await config.save();
    }

    res.json(config);
};