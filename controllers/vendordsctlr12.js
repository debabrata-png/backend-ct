const vendords2 = require("../Models/vendords2");

// Add single vendor
exports.addvendords2 = async (req, res) => {
    try {
        const { name, user, colid, vendorname, pan, gst, address, state, city, mobileno, email, type, doclink } = req.body;

        const newVendor = new vendords2({
            name,
            user,
            colid,
            vendorname,
            pan,
            gst,
            address,
            state,
            city,
            mobileno,
            email,
            email,
            type,
            doclink
        });

        await newVendor.save();

        return res.status(201).json({
            success: true,
            message: "Vendor added successfully",
            data: newVendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding vendor",
            error: error.message
        });
    }
};

// Get all vendors
exports.getallvendords2 = async (req, res) => {
    try {
        const { colid, page, limit, search } = req.query;
        const query = { colid };

        if (search) {
            query.$or = [
                { vendorname: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } },
                { state: { $regex: search, $options: 'i' } }
            ];
        }

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await vendords2.countDocuments(query);
            const vendors = await vendords2.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);

            return res.status(200).json({
                success: true,
                count: vendors.length,
                total,
                data: { vendors },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            const vendors = await vendords2.find(query).sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                count: vendors.length,
                data: { vendors }
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching vendors",
            error: error.message
        });
    }
};

// Get vendor by ID
exports.getvendordsbyid2 = async (req, res) => {
    try {
        const { id } = req.query;
        const vendor = await vendords2.findById(id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching vendor",
            error: error.message
        });
    }
};

// Update vendor
exports.updatevendords2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updateData = req.body;

        const vendor = await vendords2.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vendor updated successfully",
            data: vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating vendor",
            error: error.message
        });
    }
};

// Delete vendor
exports.deletevendords2 = async (req, res) => {
    try {
        const { id } = req.query;
        const vendor = await vendords2.findByIdAndDelete(id);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vendor deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting vendor",
            error: error.message
        });
    }
};
