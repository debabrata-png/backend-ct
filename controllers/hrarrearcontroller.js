const User = require('./../Models/user');
const hrsalary = require('./../Models/hrsalary');
const hrsalstructure = require('./../Models/hrsalstructure');

const toUtcDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

const daysInUtcMonth = (date) => (
    new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
);

const addUtcDays = (date, days) => {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
};

const calculateProrataAmount = (monthlyAmount, effectiveDate, appliedDate) => {
    const start = toUtcDate(effectiveDate);
    const end = toUtcDate(appliedDate);

    if (!start || !end || end <= start) {
        return 0;
    }

    let cursor = new Date(start);
    let amount = 0;

    while (cursor < end) {
        const monthEnd = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1));
        const segmentEnd = monthEnd < end ? monthEnd : end;
        const days = Math.round((segmentEnd - cursor) / (24 * 60 * 60 * 1000));
        amount += (Number(monthlyAmount || 0) / daysInUtcMonth(cursor)) * days;
        cursor = segmentEnd;
    }

    return Math.round(amount * 100) / 100;
};

const getEmployeeById = async (employeeid) => {
    if (!employeeid) return null;
    return User.findById(employeeid).select('name email');
};

exports.hrPopulateArrear = async (req, res) => {
    try {
        const { colid, employeeid, month, year, user, name } = req.body;

        if (!colid || !employeeid || !month || !year) {
            return res.status(400).json({ message: 'colid, employee, month and year are required' });
        }

        const employee = await getEmployeeById(employeeid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const numericColid = Number(colid);
        const activeStructures = await hrsalstructure.find({
            colid: numericColid,
            empid: employee.email,
            level: /^Active$/i
        });

        if (!activeStructures.length) {
            return res.status(404).json({ message: 'No active salary structure found for selected employee' });
        }

        const arrearDocs = activeStructures
            .map((item) => {
                const amount = calculateProrataAmount(item.amount, item.effectivedate, item.applieddate);
                if (!amount) return null;

                return {
                    name: name || item.name || employee.name || 'System',
                    user: user || item.user || 'System',
                    colid: numericColid,
                    year,
                    month,
                    duedate: new Date(),
                    structure: item.structure,
                    structureid: item.structureid,
                    employee: item.employee || employee.name,
                    empid: item.empid || employee.email,
                    component: item.component,
                    amount,
                    type: item.type,
                    level: 'Arrear',
                    paystatus: 'pending',
                    status1: 'Submitted',
                    comments: `Arrear from ${toUtcDate(item.effectivedate)?.toISOString().slice(0, 10)} to ${toUtcDate(item.applieddate)?.toISOString().slice(0, 10)}`
                };
            })
            .filter(Boolean);

        if (!arrearDocs.length) {
            return res.status(400).json({ message: 'No arrear amount generated. Please check effective date and applied date.' });
        }

        await hrsalary.deleteMany({
            colid: numericColid,
            empid: employee.email,
            month,
            year,
            level: /^Arrear$/i
        });

        const inserted = await hrsalary.insertMany(arrearDocs);

        const arrears = await hrsalary.find({
            colid: numericColid,
            empid: employee.email,
            level: /^Arrear$/i
        }).sort({ year: -1, month: 1, component: 1 });

        res.status(201).json({
            message: 'Arrear populated successfully',
            count: inserted.length,
            arrears
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.hrGetEmployeeArrears = async (req, res) => {
    try {
        const { colid, employeeid } = req.query;

        if (!colid || !employeeid) {
            return res.status(400).json({ message: 'colid and employee are required' });
        }

        const employee = await getEmployeeById(employeeid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const arrears = await hrsalary.find({
            colid: Number(colid),
            empid: employee.email,
            level: /^Arrear$/i
        }).sort({ year: -1, month: 1, component: 1 });

        res.json(arrears);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
