const landingpageds = require("../Models/landingpageds");

// Create Landing Page (QR generation removed)
exports.createlandingpageds = async (req, res) => {
    try {
        const {
            colid,
            page_name,
            page_slug,
            page_url,
            category,
            page_content,
            form_fields,
            created_by,
        } = req.body;

        // Check if slug already exists
        const existingPage = await landingpageds.findOne({ page_slug });
        if (existingPage) {
            return res.status(400).json({
                success: false,
                message: "Page slug already exists",
            });
        }

        const newPage = new landingpageds({
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
            message: "Landing page created successfully",
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

// Get All Landing Pages
exports.getalllandingpagesds = async (req, res) => {
    try {
        const { colid } = req.query;

        const pages = await landingpageds.find({ colid }).sort({ createdAt: -1 });

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

// Get Landing Page by ID
exports.getlandingpagebyidds = async (req, res) => {
    try {
        const { id } = req.params;

        const page = await landingpageds.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
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

// Get Landing Page by Slug (for public access)
exports.getlandingpagebyslugds = async (req, res) => {
    try {
        const { slug } = req.params;

        const page = await landingpageds.findOne({ page_slug: slug });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
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

// Update Landing Page
exports.updatelandingpageds = async (req, res) => {
    try {
        const { id } = req.query;
        const updateData = req.body;

        const page = await landingpageds.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Landing page updated successfully",
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

// Delete Landing Page
exports.deletelandingpageds = async (req, res) => {
    try {
        const { id } = req.params;

        const page = await landingpageds.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Landing page deleted successfully",
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

// Add QR Code to Landing Page (NEW)
exports.addqrcodeds = async (req, res) => {
    try {
        const { id } = req.query;
        const { qr_name, source, qr_data_url } = req.body;

        const page = await landingpageds.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
            });
        }

        // Add new QR code to array
        page.qr_codes.push({
            qr_name,
            source,
            qr_data_url,
            created_at: new Date(),
        });

        await page.save();

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

// Delete QR Code from Landing Page (NEW)
exports.deleteqrcodeds = async (req, res) => {
    try {
        const { id, qr_id } = req.query;

        const page = await landingpageds.findById(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Landing page not found",
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
