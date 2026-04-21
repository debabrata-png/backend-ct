const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");
const Fees = require("../Models/fees");

// Generate Fees for a Single Student
exports.generateFeeForStudentds = async (req, res) => {
    try {
        const { regno, colid, name, user } = req.query;

        if (!regno || !colid || !name || !user) {
            return res.status(400).json({
                success: false,
                message: "regno, colid, name, and user are required in query parameters",
            });
        }

        // 1. Fetch the student from the User collection
        const student = await User.findOne({
            regno: String(regno),
            colid: Number(colid)
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found with provided regno and colid",
            });
        }

        // 2. Fetch fees matching the student using aggregation
        // Matches programcode and colid, then filters by the student's category
        const applicableFees = await Fees.aggregate([
            {
                $match: {
                    colid: Number(colid),
                    programcode: student.programcode,
                    feecategory: student.category
                }
            }
        ]);

        if (!applicableFees || applicableFees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applicable fees found for this student's program and category",
            });
        }

        // 3. Prepare the Ledgerstud records
        const ledgerEntries = applicableFees.map((fee) => {
            const isPositive = fee.amount >= 0;

            return {
                name: String(name),
                user: String(user),
                feegroup: fee.feegroup,
                regno: student.regno,
                student: student.name,
                feeitem: fee.feeeitem,
                feecategory: fee.feecategory,
                amount: isPositive ? fee.amount : -fee.amount,
                type: isPositive ? "positive" : "negative",
                semester: fee.semester || student.semester,
                academicyear: fee.academicyear || student.admissionyear,
                classdate: fee.classdate,
                status: isPositive ? "Due" : "Paid",
                colid: Number(colid),
                programcode: student.programcode,
                admissionyear: student.admissionyear,
                duedate: fee.classdate,
                comments: `NA`
            };
        });

        // 4. Insert all ledger entries efficiently
        await Ledgerstud.insertMany(ledgerEntries);

        res.status(201).json({
            success: true,
            message: `${ledgerEntries.length} fee items successfully generated for student ${student.name}`,
            data: ledgerEntries
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating fees for student",
            error: error.message
        });
    }
};

// Generate Fees for an Entire Program
exports.generateFeeForProgramds = async (req, res) => {
    try {
        const { programcode, academicyear, colid, name, user } = req.query;

        if (!programcode || !academicyear || !colid || !name || !user) {
            return res.status(400).json({
                success: false,
                message: "programcode, academicyear, colid, name, and user are required in query parameters",
            });
        }

        // 1. Fetch all students in the given program using Aggregation
        const students = await User.aggregate([
            {
                $match: {
                    colid: Number(colid),
                    programcode: String(programcode),
                    // Optionally filter by admissionyear if it maps to academicyear, 
                    // or just match all active students in the program
                    // status: 1  // Assuming status 1 is active (if applicable)
                }
            }
        ]);

        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found for this program",
            });
        }

        // 2. Fetch all fees for the given program and academic year
        const programFees = await Fees.aggregate([
            {
                $match: {
                    colid: Number(colid),
                    programcode: String(programcode),
                    academicyear: String(academicyear)
                }
            }
        ]);

        if (!programFees || programFees.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No fee structure found for this program and academic year",
            });
        }

        // 3. Process each student and map the appropriate fees
        let allLedgerEntries = [];

        students.forEach((student) => {
            // Find fees that apply to this specific student's category
            const applicableFees = programFees.filter(fee => fee.feecategory === student.category);

            const studentEntries = applicableFees.map((fee) => {
                const isPositive = fee.amount >= 0;

                return {
                    name: String(name),
                    user: String(user),
                    feegroup: fee.feegroup,
                    regno: student.regno,
                    student: student.name,
                    feeitem: fee.feeeitem,
                    feecategory: fee.feecategory,
                    amount: isPositive ? fee.amount : -fee.amount,
                    type: isPositive ? "positive" : "negative",
                    semester: fee.semester || student.semester,
                    academicyear: fee.academicyear || academicyear,
                    classdate: new Date(),
                    status: isPositive ? "due" : "paid",
                    colid: Number(colid),
                    programcode: student.programcode,
                    admissionyear: student.admissionyear,
                    duedate: fee.classdate || new Date(),
                    comments: `Auto-generated from program fee structure for ${academicyear}`
                };
            });

            allLedgerEntries = allLedgerEntries.concat(studentEntries);
        });

        if (allLedgerEntries.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applicable fees matched the categories of the students in this program",
            });
        }

        // 4. Bulk insert the generated legder entries
        await Ledgerstud.insertMany(allLedgerEntries);

        res.status(201).json({
            success: true,
            message: `Successfully generated ${allLedgerEntries.length} fee items across ${students.length} students in program ${programcode}`,
            summary: {
                totalEntries: allLedgerEntries.length,
                totalStudentsProcessed: students.length
            },
            data: allLedgerEntries
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating fees for program",
            error: error.message
        });
    }
};
