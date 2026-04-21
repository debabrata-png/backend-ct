const Student = require('../Models/studentmeritds');
const Allocation = require('../Models/allocationmeritds');
const Subject = require('../Models/subjectmeritds');

// Generate merit list data
exports.meritListds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const students = await Student.find({ programmeCode, colid, isActive: true })
            .sort({ cgpa: -1, formTimestamp: 1 });

        const data = students.map((student, index) => ({
            meritRank: index + 1,
            enrollmentNumber: student.enrollmentNumber,
            name: student.name,
            email: student.email,
            division: student.division,
            rollNo: student.rollNo,
            cgpa: student.cgpa,
            mobileNumber: student.mobileNumber
        }));

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating merit list',
            error: error.message
        });
    }
};

// Generate allocation results
exports.allocationResultsds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const allocations = await Allocation.find({ sessionId, colid }).sort({ meritRank: 1 });

        const data = allocations.map(allocation => ({
            meritRank: allocation.meritRank,
            enrollmentNumber: allocation.enrollmentNumber,
            studentName: allocation.studentName,
            division: allocation.division,
            cgpa: allocation.cgpa,
            allocatedSubject: allocation.allocatedSubject || 'NOT ALLOCATED',
            allocatedSubjectName: allocation.allocatedSubjectName || 'NOT ALLOCATED',
            preferenceRank: allocation.preferenceRank || '-',
            allocationStatus: allocation.allocationStatus,
            remarks: allocation.remarks || ''
        }));

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating allocation results',
            error: error.message
        });
    }
};

// Generate subject-wise student list
exports.subjectWiseds = async (req, res) => {
    try {
        const { sessionId, subjectCode, colid } = req.body;

        const allocations = await Allocation.find({
            sessionId,
            colid,
            allocatedSubject: subjectCode,
            allocationStatus: 'ALLOCATED'
        }).sort({ meritRank: 1 });

        const data = allocations.map(allocation => ({
            meritRank: allocation.meritRank,
            enrollmentNumber: allocation.enrollmentNumber,
            studentName: allocation.studentName,
            division: allocation.division,
            cgpa: allocation.cgpa,
            preferenceRank: allocation.preferenceRank
        }));

        res.status(200).json({
            success: true,
            subjectCode,
            subjectName: allocations[0]?.allocatedSubjectName || '',
            count: data.length,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating subject-wise list',
            error: error.message
        });
    }
};

// Calculate demand analysis
exports.demandAnalysisds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const students = await Student.find({ programmeCode, colid, isActive: true });
        const subjects = await Subject.find({ programmeCode, colid, isActive: true });

        const analysis = subjects.map(subject => {
            const demandData = {
                subjectCode: subject.subjectCode,
                subjectName: subject.subjectName,
                totalSeats: subject.totalSeats,
                pref1Count: 0,
                pref2Count: 0,
                pref3Count: 0,
                pref4Count: 0,
                pref5Count: 0,
                pref6Count: 0,
                pref7Count: 0,
                pref8Count: 0,
                pref9Count: 0,
                totalDemand: 0
            };

            students.forEach(student => {
                student.preferences.forEach(pref => {
                    if (pref.subjectCode === subject.subjectCode) {
                        demandData[`pref${pref.rank}Count`]++;
                        demandData.totalDemand++;
                    }
                });
            });

            return demandData;
        });

        res.status(200).json({
            success: true,
            analysis
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating demand analysis',
            error: error.message
        });
    }
};

// Find subjects with no demand
exports.notChosenSubjectsds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const students = await Student.find({ programmeCode, colid, isActive: true });
        const subjects = await Subject.find({ programmeCode, colid, isActive: true });

        const chosenSubjects = new Set();
        students.forEach(student => {
            student.preferences.forEach(pref => {
                chosenSubjects.add(pref.subjectCode);
            });
        });

        const notChosen = subjects.filter(subject => !chosenSubjects.has(subject.subjectCode));

        res.status(200).json({
            success: true,
            count: notChosen.length,
            data: notChosen.map(s => ({
                subjectCode: s.subjectCode,
                subjectName: s.subjectName,
                totalSeats: s.totalSeats
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error finding not chosen subjects',
            error: error.message
        });
    }
};
