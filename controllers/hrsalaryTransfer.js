const hrsalary = require('./../Models/hrsalary');
const hrsalstructure = require('./../Models/hrsalstructure');

exports.generateSalary = async (req, res) => {
    try {
        const { colid, month, year } = req.body;

        // 1. Get all structure records for colid
        const structures = await hrsalstructure.find({ colid });

        if (!structures.length) {
            return res.status(404).json({ message: "No structures found" });
        }

        // 2. Prepare salary records
        const salaryDocs = structures.map(s => ({
            name: s.name,
            user: s.user,
            colid: s.colid,
            year,
            month,
            duedate: new Date(),
            structure: s.structure,
            structureid: s.structureid,
            employee: s.employee,
            empid: s.empid,
            component: s.component,
            amount: s.amount,
            type: s.type,
            level: s.level,
            paystatus: "pending",
            status1: s.status1,
            comments: s.comments
        }));

        // 3. Remove existing salary for same period (avoid duplicates)
        await hrsalary.deleteMany({ colid, month, year });

        // 4. Insert new salary
        await hrsalary.insertMany(salaryDocs);

        res.json({ message: "Salary generated successfully", count: salaryDocs.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};