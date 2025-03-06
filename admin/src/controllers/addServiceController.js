const { createService, deleteService } = require('../services/addServiceServices');

// handles adding a service
exports.addService = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const service = await createService({ name, description, price });
        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// handles removing a service
exports.removeService = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteService(id);
        res.status(200).json({ message: 'Service removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

