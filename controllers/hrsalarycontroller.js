const User = require('./../Models//user');
const hrsalstructure = require('./../Models/hrsalstructure');
const hrsalary = require('./../Models/hrsalary');
const hrstructure = require('./../Models/hrstructure');
const hrstructuresal = require('./../Models/hrstructuresal');

const ugcSeventhPayTemplates = [
    {
        key: 'AL10',
        label: 'UGC 7th Commission - Academic Level 10 - Assistant Professor',
        designation: 'Assistant Professor',
        level: 'Academic Level 10',
        basic: 57700,
        businessrole: 'Teaching'
    },
    {
        key: 'AL11',
        label: 'UGC 7th Commission - Academic Level 11 - Assistant Professor Senior Scale',
        designation: 'Assistant Professor Senior Scale',
        level: 'Academic Level 11',
        basic: 68900,
        businessrole: 'Teaching'
    },
    {
        key: 'AL12',
        label: 'UGC 7th Commission - Academic Level 12 - Assistant Professor Selection Grade',
        designation: 'Assistant Professor Selection Grade',
        level: 'Academic Level 12',
        basic: 79800,
        businessrole: 'Teaching'
    },
    {
        key: 'AL13A',
        label: 'UGC 7th Commission - Academic Level 13A - Associate Professor',
        designation: 'Associate Professor',
        level: 'Academic Level 13A',
        basic: 131400,
        businessrole: 'Teaching'
    },
    {
        key: 'AL14',
        label: 'UGC 7th Commission - Academic Level 14 - Professor',
        designation: 'Professor',
        level: 'Academic Level 14',
        basic: 144200,
        businessrole: 'Teaching'
    },
    {
        key: 'AL15',
        label: 'UGC 7th Commission - Academic Level 15 - Senior Professor',
        designation: 'Senior Professor',
        level: 'Academic Level 15',
        basic: 182200,
        businessrole: 'Teaching'
    }
];

const buildUgcSeventhComponents = (template) => [
    { component: 'Basic', amount: template.basic, type: 'Credit' },
    { component: 'DA', amount: 0, type: 'Credit' },
    { component: 'HRA', amount: 0, type: 'Credit' },
    { component: 'TA', amount: 0, type: 'Credit' },
    { component: 'PF', amount: 0, type: 'Deduction' },
    { component: 'TDS', amount: 0, type: 'Deduction' }
];

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

exports.hrGetUgcSeventhPayTemplates = async (req, res) => {
    try {
        const data = ugcSeventhPayTemplates.map((template) => ({
            ...template,
            paycommission: 'UGC Seventh Pay Commission',
            components: buildUgcSeventhComponents(template).map((component, index) => ({
                id: index + 1,
                level: template.level,
                ...component
            }))
        }));

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.hrCreateUgcSeventhPayStructure = async (req, res) => {
    try {
        const { colid, user, name, gradeKey } = req.body;

        if (!colid) {
            return res.status(400).json({ success: false, message: 'College id is required' });
        }
        if (!gradeKey) {
            return res.status(400).json({ success: false, message: 'Please select pay structure grade' });
        }

        const template = ugcSeventhPayTemplates.find((item) => item.key === gradeKey);
        if (!template) {
            return res.status(400).json({ success: false, message: 'Invalid pay structure grade' });
        }

        const createdBy = user || name || 'System';
        const createdName = name || user || 'System';
        const numericColid = Number(colid);

        const structure = await hrstructure.create({
            name: createdName,
            user: createdBy,
            colid: numericColid,
            struture: template.label,
            description: `Auto-created salary structure for ${template.label}`,
            businessrole: template.businessrole,
            paycommission: 'UGC Seventh Pay Commission',
            designation: template.designation,
            type: 'UGC Seventh Commission',
            level: template.level,
            status1: 'Submitted',
            comments: 'Created from UGC seventh commission pay structure template'
        });

        const components = buildUgcSeventhComponents(template).map((component) => ({
            name: createdName,
            user: createdBy,
            colid: numericColid,
            stuctureid: structure._id.toString(),
            structure: structure.struture,
            component: component.component,
            amount: component.amount,
            type: component.type,
            level: template.level,
            status1: 'Submitted',
            comments: 'Created from UGC seventh commission pay structure template'
        }));

        const insertedComponents = await hrstructuresal.insertMany(components);

        res.status(201).json({
            success: true,
            message: 'UGC seventh commission salary structure created successfully',
            data: {
                structure,
                components: insertedComponents
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
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
