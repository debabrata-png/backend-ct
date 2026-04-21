const CashApprovalds = require("../Models/CashApprovalds");

exports.createRequest = async (req, res) => {
    try {
        const newRequest = await CashApprovalds.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                request: newRequest,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        // Advanced filtering if needed, but basic query matching covers colid and user
        let query = CashApprovalds.find(queryObj);

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        const requests = await query;

        res.status(200).json({
            status: "success",
            results: requests.length,
            data: {
                requests,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getRequestById = async (req, res) => {
    try {
        const request = await CashApprovalds.findById(req.params.id);
        if (!request) {
            return res.status(404).json({
                status: "fail",
                message: "No request found with that ID",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                request,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.approveRequest = async (req, res) => {
    try {
        const request = await CashApprovalds.findByIdAndUpdate(
            req.body.id,
            { status: "Approved", approvedBy: req.body.approvedBy },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!request) {
            return res.status(404).json({
                status: "fail",
                message: "No request found with that ID",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                request,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        await CashApprovalds.findByIdAndDelete(req.body.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};
