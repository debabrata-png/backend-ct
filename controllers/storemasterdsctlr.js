const storemasterds = require('../Models/storemasterds');

exports.addstoremasterds = async (req, res) => {
    try {
        const newStore = await storemasterds.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                store: newStore
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updatestoremasterds = async (req, res) => {
    try {
        const store = await storemasterds.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                store
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deletestoremasterds = async (req, res) => {
    try {
        await storemasterds.findByIdAndDelete(req.query.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getallstoremasterds = async (req, res) => {
    try {
        const { colid, page, limit, search } = req.query;
        const query = { colid };

        if (search) {
            query.$or = [
                { storename: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { storemanager: { $regex: search, $options: 'i' } }
            ];
        }

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await storemasterds.countDocuments(query);
            const stores = await storemasterds.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);

            res.status(200).json({
                status: 'success',
                results: stores.length,
                total,
                data: { stores },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            const stores = await storemasterds.find(query).sort({ createdAt: -1 });
            res.status(200).json({
                status: 'success',
                results: stores.length,
                data: { stores }
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getstoremasterdsbyid = async (req, res) => {
    try {
        const store = await storemasterds.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: {
                store
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
