const deliverytypeds2 = require('../Models/deliverytypeds2');

exports.adddeliverytypeds2 = async (req, res) => {
    try {
        const newDeliveryType = await deliverytypeds2.create(req.body);
        res.status(201).json({ success: true, message: 'Delivery type added', data: newDeliveryType });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding delivery type', error: error.message });
    }
};

exports.getalldeliverytypeds2 = async (req, res) => {
    try {
        const { colid } = req.query;
        const deliveryTypes = await deliverytypeds2.find({ colid }).sort({ isDefault: -1, name: 1 });
        res.status(200).json({ success: true, count: deliveryTypes.length, data: { deliveryTypes } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching delivery types', error: error.message });
    }
};

exports.updatedeliverytypeds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updated = await deliverytypeds2.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Delivery type not found' });
        res.status(200).json({ success: true, message: 'Delivery type updated', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating delivery type', error: error.message });
    }
};

exports.deletedeliverytypeds2 = async (req, res) => {
    try {
        const { id } = req.query;
        await deliverytypeds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Delivery type deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting delivery type', error: error.message });
    }
};
