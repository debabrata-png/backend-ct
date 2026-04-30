const hrsalary = require('./../Models/hrsalary');
const hrsalstructure = require('./../Models/hrsalstructure');

exports.generateSalary = async (req, res) => {
    try {
        const { colid, month, year } = req.body;
        const numericColid = Number(colid);

        // 1. Get only active structure records for colid
        const structures = await hrsalstructure.find({
            colid: numericColid,
            level: /^Active$/i
        });

        if (!structures.length) {
            return res.status(404).json({ message: "No active salary structures found" });
        }

        // 2. Prepare salary records
        const salaryDocs = structures.map(s => ({
            name: s.name,
            user: s.user,
            colid: numericColid,
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
            level: "Active",
            paystatus: "pending",
            status1: s.status1,
            comments: s.comments
        }));

        // 3. Remove existing salary for same period (avoid duplicates)
        await hrsalary.deleteMany({ colid: numericColid, month, year });

        // 4. Insert new salary
        const insertedSalary = await hrsalary.insertMany(salaryDocs);

        const summaryMap = insertedSalary.reduce((acc, item) => {
            const key = item.empid || item.employee || item._id.toString();
            if (!acc[key]) {
                acc[key] = {
                    id: key,
                    empid: item.empid,
                    employee: item.employee,
                    structure: item.structure,
                    earnings: 0,
                    deductions: 0,
                    total: 0,
                    components: 0
                };
            }

            const amount = Number(item.amount || 0);
            const isDeduction = String(item.type || '').toLowerCase() === 'deduction';
            if (isDeduction) {
                acc[key].deductions += amount;
            } else {
                acc[key].earnings += amount;
            }
            acc[key].total = acc[key].earnings - acc[key].deductions;
            acc[key].components += 1;
            return acc;
        }, {});

        const summary = Object.values(summaryMap).sort((a, b) =>
            String(a.employee || '').localeCompare(String(b.employee || ''))
        );

        res.json({
            message: "Salary generated successfully",
            count: insertedSalary.length,
            summary,
            details: insertedSalary
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
