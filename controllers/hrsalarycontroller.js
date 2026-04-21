const User = require('./../Models//user');
const hrsalstructure = require('./../Models/hrsalstructure');
const hrsalary = require('./../Models/hrsalary');
const hrstructure = require('./../Models/hrstructure');
const hrstructuresal = require('./../Models/hrstructuresal');

// Get Users (non-students)
exports.hrGetUsers = async (req, res) => {
    try {
        const { colid } = req.query;

        const users = await User.find({
            colid,
            role: { $ne: 'Student' }
        }).select('name empid role');

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Salary Structures
exports.hrGetStructures = async (req, res) => {
    try {
        const { colid } = req.query;

        const structures = await hrstructure.find({ colid });

        res.json(structures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Generate Salary
exports.hrGenerateSalary = async (req, res) => {
    try {
        const { colid, empid, structureid, month, year, user } = req.body;

        // 1. Get structure components
        const components = await hrsalstructure.find({
            colid,
            structureid,
            empid
        });

        if (!components.length) {
            return res.status(400).json({ message: 'No structure found' });
        }

        // 2. Delete existing salary (overwrite)
        await hrsalary.deleteMany({ colid, empid, month, year });

        // 3. Prepare salary records
        const salaryData = components.map(item => ({
            name: item.name,
            user,
            colid,
            year,
            month,
            structureId: item.structureid,
            structureName: item.structure,
            employee: item.employee,
            empid: item.empid,
            component: item.component,
            amount: item.amount,
            componentType: item.type,
            level: item.level,
            paystatus: 'PENDING'
        }));

        // 4. Insert
        await hrsalary.insertMany(salaryData);

        res.json({ message: 'Salary generated successfully' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};