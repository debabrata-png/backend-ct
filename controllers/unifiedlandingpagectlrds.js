const unifiedlandingpageds = require("../Models/unifiedlandingpageds");

// Create Unified Landing Page
exports.createunifiedlandingpageds = async (req, res) => {
    try {
        const {
            colid,
            page_name,
            page_slug,
            page_url,
            category, // Optional
            page_content,
            form_fields,
            created_by,
        } = req.body;

        // Check if slug already exists
        const existingPage = await unifiedlandingpageds.findOne({ page_slug });
        if (existingPage) {
            return res.status(400).json({
                success: false,
                message: "Page slug already exists",
            });
        }

        const newPage = new unifiedlandingpageds({
            colid,
            page_name,
            page_slug,
            page_url,
            category,
            page_content,
            form_fields,
            qr_codes: [], // Initialize empty array
            created_by,
        });

        await newPage.save();

        res.status(201).json({
            success: true,
            message: "Unified Landing page created successfully",
            data: newPage,
        });
    } catch (err) {
        // console.error("Error creating landing page:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Get All Unified Landing Pages
exports.getallunifiedlandingpagesds = async (req, res) => {
    try {
        const { colid } = req.query;

        const pages = await unifiedlandingpageds.find({ colid }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: pages,
        });
    } catch (err) {
        // console.error("Error fetching landing pages:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Get Unified Landing Page by ID
exports.getunifiedlandingpagebyidds = async (req, res) => {
    try {
        const { id } = req.params;

        const page = await unifiedlandingpageds.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            data: page,
        });
    } catch (err) {
        // console.error("Error fetching landing page:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Get Unified Landing Page by Slug (for public access)
exports.getunifiedlandingpagebyslugds = async (req, res) => {
    try {
        const { slug } = req.params;

        const page = await unifiedlandingpageds.findOne({ page_slug: slug });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        // Increment visit count
        page.visit_count = (page.visit_count || 0) + 1;
        await page.save();

        res.status(200).json({
            success: true,
            data: page,
        });
    } catch (err) {
        // console.error("Error fetching landing page:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Update Unified Landing Page
exports.updateunifiedlandingpageds = async (req, res) => {
    try {
        const { id } = req.query;
        const updateData = req.body;

        const page = await unifiedlandingpageds.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Unified Landing page updated successfully",
            data: page,
        });
    } catch (err) {
        // console.error("Error updating landing page:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Delete Unified Landing Page
exports.deleteunifiedlandingpageds = async (req, res) => {
    try {
        const { id } = req.params;

        const page = await unifiedlandingpageds.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Unified Landing page deleted successfully",
        });
    } catch (err) {
        // console.error("Error deleting landing page:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Add QR Code to Unified Landing Page
exports.addunifiedqrcodeds = async (req, res) => {
    try {
        const { id } = req.query;
        const { qr_name, source, qr_data_url } = req.body;

        const page = await unifiedlandingpageds.findByIdAndUpdate(
            id,
            {
                $push: {
                    qr_codes: {
                        qr_name,
                        source,
                        qr_data_url,
                        created_at: new Date(),
                    }
                }
            },
            { new: true }
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "QR code added successfully",
            data: page,
        });
    } catch (err) {
        // console.error("Error adding QR code:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};

// Delete QR Code from Unified Landing Page
exports.deleteunifiedqrcodeds = async (req, res) => {
    try {
        const { id, qr_id } = req.query;

        const page = await unifiedlandingpageds.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Unified Landing page not found",
            });
        }

        // Remove QR code from array
        page.qr_codes = page.qr_codes.filter(
            (qr) => qr._id.toString() !== qr_id
        );

        await page.save();

        res.status(200).json({
            success: true,
            message: "QR code deleted successfully",
            data: page,
        });
    } catch (err) {
        // console.error("Error deleting QR code:", err);
        // res.status(500).json({
        //     success: false,
        //     message: "Server error",
        //     error: err.message,
        // });
    }
};
