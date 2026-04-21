const User = require('./../Models/user');
const hrstructure = require('./../Models/hrstructure');
const hrstructuresal = require('./../Models/hrstructuresal');
const hrsalstructure = require('./../Models/hrsalstructure');
const hrsalary = require('./../Models/hrsalary');


// ✅ Get Employees (non-student)
exports.salGetEmployees = async (req, res) => {
    try {
        const { colid } = req.query;

        const users = await User.find({
            role: { $ne: 'student' },
            colid
        }).select('name');

        res.json(users);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ✅ Get Structures
exports.salGetStructures = async (req, res) => {
    try {
        const { colid } = req.query;

        const data = await hrstructure.find({ colid });

        res.json(data);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ✅ Assign Salary Structure to Employee
exports.salAssignStructure = async (req, res) => {
    try {
        const { employeeid, structureid, colid } = req.body;

        //console.log(req.body);

        // 1️⃣ Get employee
        const emp = await User.findById(employeeid);

        // 2️⃣ Get structure
        const structure = await hrstructure.findById(structureid);

        // 3️⃣ Get structure components
        const components = await hrstructuresal.find({
            stuctureid: structureid,
            colid
        });

        // 4️⃣ Delete old salary (overwrite)
        await hrsalstructure.deleteMany({
            // empid: employeeid,
            empid: emp.email,
            colid
        });

        // 5️⃣ Insert employee salary
        const insertData = components.map(item => ({
            name: item.name || '',         // ignored as per your instruction
            user: item.user || '',
            colid,

            structure: structure.struture,
            structureid: structureid,

            employee: emp.name,
            // empid: employeeid,
            empid: emp.email,

            component: item.component,
            amount: item.amount,
            type: item.type,
            level: item.level,
            status1: item.status1,
            comments: item.comments
        }));

        //console.log(insertData);

        await hrsalstructure.insertMany(insertData);

        res.json({ message: 'Salary assigned successfully' });

    } catch (err) {
        res.status(500).json(err);
    }
};

// 16/04/26


// 🎯 Convert FY like "2026-27" → 2026
const getStartYear = (fy) => parseInt(fy.split('-')[0]);

// 🇮🇳 Simple TDS Calculation (Old Regime Example)
const calculateIncomeTax = (annualIncome) => {
    let tax = 0;

    if (annualIncome <= 250000) return 0;
    if (annualIncome <= 500000) tax = (annualIncome - 250000) * 0.05;
    else if (annualIncome <= 1000000)
        tax = 12500 + (annualIncome - 500000) * 0.2;
    else
        tax = 112500 + (annualIncome - 1000000) * 0.3;

    return tax;
};

exports.calculateTDS = async (req, res) => {
    try {
        const { month, year, colid } = req.body;

        //console.log(req.body);

        // 1️⃣ Get all salary rows for that month/year
        const data = await hrsalary.find({ month, year, colid });

        //console.log(data);

        // 2️⃣ Group by employee
        const grouped = {};

        data.forEach(item => {
            if (!grouped[item.empid]) {
                grouped[item.empid] = [];
            }
            grouped[item.empid].push(item);
        });

        // 3️⃣ Process each employee
        for (let empid in grouped) {
            const records = grouped[empid];

            //console.log(records);

            // 👉 Monthly total
            let monthlyTotal = records.reduce((sum, r) => sum + (r.amount || 0), 0);

            // 👉 Annual projection
            const annualIncome = monthlyTotal * 12;



            // 👉 Tax
            const annualTax = calculateIncomeTax(annualIncome);

            // 👉 Monthly TDS
            const monthlyTDS = annualTax / 12;

            //console.log(empid + ',' + annualTax);

            // 4️⃣ Insert TDS record (negative)
            await hrsalary.create({
                name: records[0].name,
                user: records[0].user,
                structure:records[0].structure,
                structureid:records[0].structureid,
                colid,
                year,
                month,
                employee: records[0].employee,
                empid,
                component: "TDS",
                amount: -Math.round(monthlyTDS),
                type: "Deduction",
                level: records[0].level,
                paystatus: "Pending"
            });
        }

        res.json({ success: true, message: "TDS calculated and inserted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// 🇮🇳 PF calculation
const calculatePF = (basicSalary) => {
    const PF_RATE = 0.12;
    const PF_LIMIT = 15000;

    const eligibleSalary = Math.min(basicSalary, PF_LIMIT);

    var pf1=eligibleSalary * PF_RATE * 2;

    // return Math.round(eligibleSalary * PF_RATE);
    return Math.round(pf1);
};

exports.calculateTDS1 = async (req, res) => {
    try {
        const { month, year, colid } = req.body;

        const data = await hrsalary.find({ month, year, colid });

        const grouped = {};

        data.forEach(item => {
            if (!grouped[item.empid]) {
                grouped[item.empid] = [];
            }
            grouped[item.empid].push(item);
        });

        for (let empid in grouped) {
            const records = grouped[empid];

            // 👉 Total salary
            let monthlyTotal = 0;
            let basicSalary = 0;

            records.forEach(r => {
                monthlyTotal += (r.amount || 0);

                // 🔥 Extract BASIC component
                if (r.component && r.component.toLowerCase() === 'basic') {
                    basicSalary += r.amount;
                }
            });

            // =========================
            // 🧾 PF CALCULATION
            // =========================
            const pfAmount = calculatePF(basicSalary);

            // =========================
            // 🧾 TDS CALCULATION
            // =========================
            const annualIncome = monthlyTotal * 12;
            const annualTax = calculateIncomeTax(annualIncome);
            const monthlyTDS = Math.round(annualTax / 12);

            // ❗ Prevent duplicate PF/TDS
            const existing = await hrsalary.find({
                empid,
                month,
                year,
                colid,
                component: { $in: ["TDS", "PF"] }
            });

            const existingComponents = existing.map(e => e.component);

            // =========================
            // ➕ INSERT PF
            // =========================
            if (!existingComponents.includes("PF")) {
                await hrsalary.create({
                    name: records[0].name,
                    user: records[0].user,
                    structure:records[0].structure,
                    structureid:records[0].structureid,
                    colid,
                    year,
                    month,
                    employee: records[0].employee,
                    empid,
                    component: "PF",
                    amount: -pfAmount,
                    type: "Deduction",
                    level: records[0].level,
                    paystatus: "pending"
                });
            }

            // =========================
            // ➕ INSERT TDS
            // =========================
            if (!existingComponents.includes("TDS")) {
                await hrsalary.create({
                    name: records[0].name,
                    user: records[0].user,
                    structure:records[0].structure,
                    structureid:records[0].structureid,
                    colid,
                    year,
                    month,
                    employee: records[0].employee,
                    empid,
                    component: "TDS",
                    amount: -monthlyTDS,
                    type: "Deduction",
                    level: records[0].level,
                    paystatus: "pending"
                });
            }
        }

        res.json({ success: true, message: "TDS & PF calculated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};