const itemmasterds = require("../Models/itemmasterds");

exports.additemmasterds = async (req, res) => {
    try {
        // itemname, itemcode, itemtype, description, image, status
        const newItem = await itemmasterds.create(req.body);
        res.status(201).json({
            success: true,
            message: "Item Master added successfully",
            data: { item: newItem }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding item master",
            error: error.message
        });
    }
};

exports.getallitemmasterds = async (req, res) => {
    try {
        const { colid, page, limit, search } = req.query;
        const query = { colid };

        if (search) {
            query.$or = [
                { itemname: { $regex: search, $options: 'i' } },
                { itemcode: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await itemmasterds.countDocuments(query);
            const items = await itemmasterds.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);

            res.status(200).json({
                success: true,
                count: items.length,
                total, // Total records in DB
                data: { items },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            // Non-paginated (Legacy/Full)
            const items = await itemmasterds.find(query).sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                count: items.length,
                data: { items }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching items",
            error: error.message
        });
    }
};

exports.updateitemmasterds = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedItem = await itemmasterds.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({
            success: true,
            message: "Item updated",
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating item",
            error: error.message
        });
    }
};

exports.deleteitemmasterds = async (req, res) => {
    try {
        const { id } = req.query;
        await itemmasterds.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting item", error: error.message });
    }
};

exports.getitemmasterdsbyid = async (req, res) => {
    try {
        const { id } = req.query;
        const item = await itemmasterds.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching item", error: error.message });
    }
};
