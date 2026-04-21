const BellConfig = require('./../Models/rconfigmodel');

exports.bellSaveConfig = async (req, res) => {
    const { colid } = req.body;

    let config = await BellConfig.findOne({ colid });

    if (config) {
        config = await BellConfig.findOneAndUpdate({ colid }, req.body, { new: true });
    } else {
        config = await BellConfig.create(req.body);
    }

    res.json(config);
};

exports.bellGetConfig = async (req, res) => {
    const config = await BellConfig.findOne({ colid: req.body.colid });
    res.json(config);
};

// Z-score auto bands
exports.bellAutoBands = async (req, res) => {
    const bands = [
        { grade:'O', minZ:1.5, maxZ:100, gradepoint:10 },
        { grade:'A+', minZ:1, maxZ:1.5, gradepoint:9 },
        { grade:'A', minZ:0.5, maxZ:1, gradepoint:8 },
        { grade:'B+', minZ:0, maxZ:0.5, gradepoint:7 },
        { grade:'B', minZ:-0.5, maxZ:0, gradepoint:6 },
        { grade:'C', minZ:-1, maxZ:-0.5, gradepoint:5 },
        { grade:'P', minZ:-1.5, maxZ:-1, gradepoint:4 },
        { grade:'F', minZ:-100, maxZ:-1.5, gradepoint:0 }
    ];

    const config = await BellConfig.findOneAndUpdate(
        { colid: req.body.colid },
        { grades: bands, gradingType:'zscore' },
        { upsert: true, new: true }
    );

    res.json(config);
};

// Percentile auto bands
exports.bellAutoPercentile = async (req, res) => {
    const bands = [
        { grade:'O', min:90, max:100, gradepoint:10 },
        { grade:'A+', min:80, max:90, gradepoint:9 },
        { grade:'A', min:70, max:80, gradepoint:8 },
        { grade:'B+', min:60, max:70, gradepoint:7 },
        { grade:'B', min:50, max:60, gradepoint:6 },
        { grade:'C', min:40, max:50, gradepoint:5 },
        { grade:'P', min:30, max:40, gradepoint:4 },
        { grade:'F', min:0, max:30, gradepoint:0 }
    ];

    const config = await BellConfig.findOneAndUpdate(
        { colid: req.body.colid },
        { percentileBands: bands, gradingType:'percentile' },
        { upsert: true, new: true }
    );

    res.json(config);
};