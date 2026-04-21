const crmh1 = require("./../Models/crmh1");

exports.getPipelineSummary = async (req, res) => {

    try {

        const colid = parseInt(req.query.colid);

        const data = await crmh1.aggregate([

            {
                $match: {
                    colid: colid
                }
            },

            {
                $group: {
                    _id: "$pipeline_stage",
                    total_leads: { $sum: 1 }
                }
            },

            {
                $project: {
                    pipeline_stage: "$_id",
                    total_leads: 1,
                    _id: 0
                }
            },

            {
                $sort: { total_leads: -1 }
            }

        ]);

        res.json(data);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};



exports.getInstitutionDetails = async (req, res) => {

    try {

        const colid = parseInt(req.query.colid);
        const stage = req.query.stage;

        const data = await crmh1.aggregate([

            {
                $match: {
                    colid: colid,
                    pipeline_stage: stage
                }
            },

            {
                $group: {
                    _id: "$institution",
                    total_leads: { $sum: 1 }
                }
            },

            {
                $project: {
                    institution: "$_id",
                    total_leads: 1,
                    _id: 0
                }
            },

            {
                $sort: { total_leads: -1 }
            }

        ]);

        res.json(data);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

};