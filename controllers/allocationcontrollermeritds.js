const AllocationSession = require('../Models/allocationsessionmeritds');
const Allocation = require('../Models/allocationmeritds');
const AllocationAuditLog = require('../Models/allocationauditlogmeritds');
const Student = require('../Models/studentmeritds');
const Subject = require('../Models/subjectmeritds');

// Single Round Allocation
exports.startSingleds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body; // Expect colid here as well for safety, or derive from session

        const session = await AllocationSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }
        // Verify colid matches session
        if (session.colid !== colid) {
            return res.status(403).json({ success: false, message: 'Unauthorized access to session' });
        }
        if (session.status !== 'PENDING' && session.status !== 'RESET') {
            return res.status(400).json({ success: false, message: 'Session already processed' });
        }

        // Update session status
        session.status = 'IN_PROGRESS';
        session.startedAt = new Date();
        await session.save();

        // Get students sorted by merit
        const students = await Student.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        }).sort({ cgpa: -1, formTimestamp: 1 });

        if (students.length === 0) {
            return res.status(400).json({ success: false, message: 'No students found' });
        }

        // Get subjects with availability
        const subjects = await Subject.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        });

        // Create seat availability map
        const seatAvailability = {};
        subjects.forEach(subject => {
            seatAvailability[subject.subjectCode] = subject.totalSeats - subject.allocatedSeats;
        });

        // Allocate students
        const allocations = [];
        const auditLogs = [];
        let meritRank = 1;
        let allocatedCount = 0;
        let notAllocatedCount = 0;

        for (const student of students) {
            let allocated = false;

            // Try each preference in order (1 to 9)
            for (const pref of student.preferences.sort((a, b) => a.rank - b.rank)) {
                if (seatAvailability[pref.subjectCode] > 0) {
                    // Seat available! Allocate
                    const subject = subjects.find(s => s.subjectCode === pref.subjectCode);

                    allocations.push({
                        sessionId: session._id,
                        colid,
                        enrollmentNumber: student.enrollmentNumber,
                        studentName: student.name,
                        programmeCode: student.programmeCode,
                        division: student.division,
                        cgpa: student.cgpa,
                        formTimestamp: student.formTimestamp,
                        meritRank: meritRank,
                        allocatedSubject: pref.subjectCode,
                        allocatedSubjectName: subject.subjectName,
                        preferenceRank: pref.rank,
                        allocationRound: 1,
                        allocationStatus: 'ALLOCATED'
                    });

                    auditLogs.push({
                        sessionId: session._id,
                        colid,
                        round: 1,
                        enrollmentNumber: student.enrollmentNumber,
                        studentName: student.name,
                        action: 'ALLOCATED',
                        subjectCode: pref.subjectCode,
                        preferenceRank: pref.rank,
                        details: `Allocated ${subject.subjectName} as preference ${pref.rank}`
                    });

                    seatAvailability[pref.subjectCode]--;
                    allocated = true;
                    allocatedCount++;
                    break;
                } else {
                    auditLogs.push({
                        sessionId: session._id,
                        colid,
                        round: 1,
                        enrollmentNumber: student.enrollmentNumber,
                        studentName: student.name,
                        action: 'SKIPPED_NO_SEATS',
                        subjectCode: pref.subjectCode,
                        preferenceRank: pref.rank,
                        details: `Preference ${pref.rank} (${pref.subjectCode}) has no seats`
                    });
                }
            }

            if (!allocated) {
                allocations.push({
                    sessionId: session._id,
                    colid,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    programmeCode: student.programmeCode,
                    division: student.division,
                    cgpa: student.cgpa,
                    formTimestamp: student.formTimestamp,
                    meritRank: meritRank,
                    allocatedSubject: null,
                    allocatedSubjectName: null,
                    preferenceRank: null,
                    allocationRound: null,
                    allocationStatus: 'NOT_ALLOCATED',
                    remarks: 'All preferences exhausted - no seats available'
                });

                auditLogs.push({
                    sessionId: session._id,
                    colid,
                    round: 1,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    action: 'NOT_ALLOCATED',
                    subjectCode: null,
                    preferenceRank: null,
                    details: 'All 9 preferences checked - no seats available'
                });

                notAllocatedCount++;
            }

            meritRank++;
        }

        // Bulk insert allocations
        await Allocation.insertMany(allocations);

        // Update subject allocated seats
        for (const subject of subjects) {
            const initialAvailable = subject.totalSeats - subject.allocatedSeats;
            const currentAvailable = seatAvailability[subject.subjectCode];
            const seatsUsed = initialAvailable - currentAvailable;
            subject.allocatedSeats += seatsUsed;
            await subject.save();
        }

        // Save audit logs
        await AllocationAuditLog.insertMany(auditLogs);

        // Update session
        session.status = 'COMPLETED';
        session.completedAt = new Date();
        session.currentRound = 1;
        await session.save();

        res.status(200).json({
            success: true,
            message: 'Single round allocation completed successfully',
            stats: {
                totalStudents: students.length,
                allocated: allocatedCount,
                notAllocated: notAllocatedCount,
                completedAt: session.completedAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error during allocation',
            error: error.message
        });
    }
};

// Multi Round Allocation - Run one round
exports.runRoundds = async (req, res) => {
    try {
        const { sessionId, round, colid } = req.body;

        if (!round || round < 1 || round > 9) {
            return res.status(400).json({ success: false, message: 'Invalid round (1-9)' });
        }

        const session = await AllocationSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }
        if (session.allocationType !== 'MULTI_ROUND') {
            return res.status(400).json({ success: false, message: 'Not a multi-round session' });
        }
        if (session.status === 'COMPLETED') {
            return res.status(400).json({ success: false, message: 'Session already completed' });
        }

        // Update session status
        if (session.status === 'PENDING' || session.status === 'RESET') {
            session.status = 'IN_PROGRESS';
            session.startedAt = new Date();
        }

        // Get all students
        const allStudents = await Student.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        }).sort({ cgpa: -1, formTimestamp: 1 });

        // Get already allocated students
        const alreadyAllocated = await Allocation.find({
            sessionId: session._id,
            allocationStatus: 'ALLOCATED',
            colid
        });
        const allocatedEnrollments = new Set(alreadyAllocated.map(a => a.enrollmentNumber));

        // Filter unallocated students
        const unallocatedStudents = allStudents.filter(s => !allocatedEnrollments.has(s.enrollmentNumber));

        if (unallocatedStudents.length === 0) {
            session.status = 'COMPLETED';
            session.completedAt = new Date();
            session.currentRound = round;
            await session.save();

            return res.status(200).json({
                success: true,
                message: 'All students already allocated',
                roundStats: { round, studentsProcessed: 0, allocated: 0, remaining: 0 }
            });
        }

        // Get subjects
        const subjects = await Subject.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        });

        const seatAvailability = {};
        subjects.forEach(subject => {
            seatAvailability[subject.subjectCode] = subject.totalSeats - subject.allocatedSeats;
        });

        const totalAvailableSeats = Object.values(seatAvailability).reduce((sum, seats) => sum + seats, 0);
        if (totalAvailableSeats === 0) {
            session.status = 'COMPLETED';
            session.completedAt = new Date();
            session.currentRound = round;
            await session.save();

            return res.status(200).json({
                success: true,
                message: 'No seats available',
                roundStats: { round, studentsProcessed: unallocatedStudents.length, allocated: 0, remaining: unallocatedStudents.length }
            });
        }

        // Allocate based on current round's preference
        const allocations = [];
        const auditLogs = [];
        let allocatedThisRound = 0;

        for (const student of unallocatedStudents) {
            const meritRank = allStudents.findIndex(s => s.enrollmentNumber === student.enrollmentNumber) + 1;
            const preference = student.preferences.find(p => p.rank === round);

            if (!preference) {
                auditLogs.push({
                    sessionId: session._id,
                    colid,
                    round,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    action: 'SKIPPED_PREFERENCE_NOT_AVAILABLE',
                    subjectCode: null,
                    preferenceRank: round,
                    details: `No preference ${round} found`
                });
                continue;
            }

            if (seatAvailability[preference.subjectCode] > 0) {
                const subject = subjects.find(s => s.subjectCode === preference.subjectCode);

                allocations.push({
                    sessionId: session._id,
                    colid,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    programmeCode: student.programmeCode,
                    division: student.division,
                    cgpa: student.cgpa,
                    formTimestamp: student.formTimestamp,
                    meritRank: meritRank,
                    allocatedSubject: preference.subjectCode,
                    allocatedSubjectName: subject.subjectName,
                    preferenceRank: round,
                    allocationRound: round,
                    allocationStatus: 'ALLOCATED'
                });

                auditLogs.push({
                    sessionId: session._id,
                    colid,
                    round,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    action: 'ALLOCATED',
                    subjectCode: preference.subjectCode,
                    preferenceRank: round,
                    details: `Allocated ${subject.subjectName} in round ${round}`
                });

                seatAvailability[preference.subjectCode]--;
                allocatedThisRound++;
            } else {
                auditLogs.push({
                    sessionId: session._id,
                    colid,
                    round,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    action: 'SKIPPED_NO_SEATS',
                    subjectCode: preference.subjectCode,
                    preferenceRank: round,
                    details: `Preference ${round} (${preference.subjectCode}) has no seats`
                });
            }
        }

        // Save allocations
        if (allocations.length > 0) {
            await Allocation.insertMany(allocations);

            // Update subject seats
            for (const subject of subjects) {
                const initialAvailable = subject.totalSeats - subject.allocatedSeats;
                const currentAvailable = seatAvailability[subject.subjectCode];
                const seatsUsed = initialAvailable - currentAvailable;
                subject.allocatedSeats += seatsUsed;
                await subject.save();
            }
        }

        // Save audit logs
        await AllocationAuditLog.insertMany(auditLogs);

        const stillUnallocated = unallocatedStudents.length - allocatedThisRound;
        const seatsStillAvailable = Object.values(seatAvailability).reduce((sum, seats) => sum + seats, 0);

        // Check if should complete
        if (round === 9 || stillUnallocated === 0 || seatsStillAvailable === 0) {
            if (stillUnallocated > 0 && round === 9) {
                const notAllocated = unallocatedStudents.filter(s =>
                    !allocations.some(a => a.enrollmentNumber === s.enrollmentNumber)
                );

                const notAllocatedRecords = notAllocated.map(student => ({
                    sessionId: session._id,
                    colid,
                    enrollmentNumber: student.enrollmentNumber,
                    studentName: student.name,
                    programmeCode: student.programmeCode,
                    division: student.division,
                    cgpa: student.cgpa,
                    formTimestamp: student.formTimestamp,
                    meritRank: allStudents.findIndex(s => s.enrollmentNumber === student.enrollmentNumber) + 1,
                    allocatedSubject: null,
                    allocatedSubjectName: null,
                    preferenceRank: null,
                    allocationRound: null,
                    allocationStatus: 'NOT_ALLOCATED',
                    remarks: 'All 9 rounds completed - no seats available'
                }));

                await Allocation.insertMany(notAllocatedRecords);
            }

            session.status = 'COMPLETED';
            session.completedAt = new Date();
        }

        session.currentRound = round;
        await session.save();

        res.status(200).json({
            success: true,
            message: `Round ${round} completed successfully`,
            roundStats: {
                round,
                studentsProcessed: unallocatedStudents.length,
                allocated: allocatedThisRound,
                remaining: stillUnallocated,
                seatsRemaining: seatsStillAvailable
            },
            sessionStatus: session.status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error during round allocation',
            error: error.message
        });
    }
};

// Get allocations by session
exports.getBySessionds = async (req, res) => {
    try {
        const { sessionId, filters, colid } = req.body;
        const query = { sessionId, colid };

        if (filters) {
            if (filters.allocationStatus) query.allocationStatus = filters.allocationStatus;
            if (filters.allocatedSubject) query.allocatedSubject = filters.allocatedSubject;
            if (filters.division) query.division = filters.division;
        }

        const allocations = await Allocation.find(query).sort({ meritRank: 1 });

        res.status(200).json({
            success: true,
            count: allocations.length,
            data: allocations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching allocations',
            error: error.message
        });
    }
};

// Get allocation by student
exports.getByStudentds = async (req, res) => {
    try {
        const { sessionId, enrollmentNumber, colid } = req.body;

        const allocation = await Allocation.findOne({ sessionId, enrollmentNumber, colid });

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: 'Allocation not found'
            });
        }

        res.status(200).json({
            success: true,
            data: allocation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching allocation',
            error: error.message
        });
    }
};

// Get allocations by subject
exports.getBySubjectds = async (req, res) => {
    try {
        const { sessionId, subjectCode, colid } = req.body;

        const allocations = await Allocation.find({
            sessionId,
            colid,
            allocatedSubject: subjectCode,
            allocationStatus: 'ALLOCATED'
        }).sort({ meritRank: 1 });

        res.status(200).json({
            success: true,
            count: allocations.length,
            data: allocations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching allocations',
            error: error.message
        });
    }
};

// Get allocation statistics
exports.getStatsds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const allocations = await Allocation.find({ sessionId, colid });

        const stats = {
            totalStudents: allocations.length,
            allocated: allocations.filter(a => a.allocationStatus === 'ALLOCATED').length,
            notAllocated: allocations.filter(a => a.allocationStatus === 'NOT_ALLOCATED').length,
            preferenceDistribution: {},
            subjectWiseAllocation: {}
        };

        // Preference distribution
        for (let i = 1; i <= 9; i++) {
            stats.preferenceDistribution[`pref${i}`] = allocations.filter(
                a => a.preferenceRank === i
            ).length;
        }

        // Subject-wise allocation
        const subjects = [...new Set(allocations.filter(a => a.allocatedSubject).map(a => a.allocatedSubject))];
        for (const subjectCode of subjects) {
            const subjectAllocations = allocations.filter(a => a.allocatedSubject === subjectCode);
            stats.subjectWiseAllocation[subjectCode] = {
                allocated: subjectAllocations.length,
                subjectName: subjectAllocations[0]?.allocatedSubjectName || ''
            };
        }

        // Average preference rank
        const validPreferences = allocations.filter(a => a.preferenceRank);
        if (validPreferences.length > 0) {
            const sum = validPreferences.reduce((acc, a) => acc + a.preferenceRank, 0);
            stats.averagePreferenceRank = (sum / validPreferences.length).toFixed(2);
        }

        res.status(200).json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching stats',
            error: error.message
        });
    }
};

// Reset allocation
exports.resetds = async (req, res) => {
    try {
        const { sessionId, colid } = req.query;
        const parsedColid = colid ? parseInt(colid) : undefined;

        const session = await AllocationSession.findOne({ _id: sessionId, colid: parsedColid });
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        // Delete allocations
        await Allocation.deleteMany({ sessionId });

        // Delete audit logs
        await AllocationAuditLog.deleteMany({ sessionId });

        // Reset subject seats
        await Subject.updateMany(
            { programmeCode: session.programmeCode },
            { $set: { allocatedSeats: 0 } }
        );

        // Reset session
        session.status = 'RESET';
        session.currentRound = 0;
        session.startedAt = null;
        session.completedAt = null;
        await session.save();

        res.status(200).json({
            success: true,
            message: 'Allocation reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error resetting allocation',
            error: error.message
        });
    }
};

// Preview before allocation
exports.previewds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const session = await AllocationSession.findOne({ _id: sessionId, colid });
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        const students = await Student.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        }).sort({ cgpa: -1, formTimestamp: 1 }).limit(20);

        const subjects = await Subject.find({
            programmeCode: session.programmeCode,
            isActive: true
        });

        const warnings = [];
        const totalSeats = subjects.reduce((sum, s) => sum + s.availableSeats, 0);
        const totalStudents = await Student.countDocuments({
            programmeCode: session.programmeCode,
            isActive: true
        });

        if (totalStudents > totalSeats) {
            warnings.push(`${totalStudents - totalSeats} students may not get allocation`);
        }

        res.status(200).json({
            success: true,
            preview: {
                students: students.map((s, i) => ({
                    meritRank: i + 1,
                    enrollmentNumber: s.enrollmentNumber,
                    name: s.name,
                    cgpa: s.cgpa,
                    preferences: s.preferences
                })),
                subjects: subjects.map(s => ({
                    subjectCode: s.subjectCode,
                    subjectName: s.subjectName,
                    totalSeats: s.totalSeats,
                    allocatedSeats: s.allocatedSeats,
                    availableSeats: s.availableSeats
                })),
                warnings,
                stats: {
                    totalStudents,
                    totalSeats
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating preview',
            error: error.message
        });
    }
};

// Get not allocated students
exports.getNotAllocatedds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const allocations = await Allocation.find({
            sessionId,
            colid,
            allocationStatus: 'NOT_ALLOCATED'
        }).sort({ meritRank: 1 });

        // Get student preferences
        const enrichedData = [];
        for (const allocation of allocations) {
            const student = await Student.findOne({ enrollmentNumber: allocation.enrollmentNumber, colid });
            enrichedData.push({
                ...allocation.toObject(),
                preferences: student?.preferences || []
            });
        }

        res.status(200).json({
            success: true,
            count: enrichedData.length,
            data: enrichedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching not allocated students',
            error: error.message
        });
    }
};

// Get audit logs
exports.getAuditLogds = async (req, res) => {
    try {
        const { sessionId, round, colid } = req.body;
        const query = { sessionId, colid };

        if (round) query.round = round;

        const logs = await AllocationAuditLog.find(query).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching audit logs',
            error: error.message
        });
    }
};

// Validate preferences
exports.validatePreferencesds = async (req, res) => {
    try {
        const { enrollmentNumber, preferences } = req.body;
        // colid isn't strictly needed for validation unless we check subject existence against valid subjects for that colid
        // For now, simple validation logic remains same, but renamed


        const errors = [];

        if (!preferences || preferences.length !== 9) {
            errors.push('Exactly 9 preferences required');
        }

        const subjectCodes = preferences.map(p => p.subjectCode);
        if (new Set(subjectCodes).size !== 9) {
            errors.push('Duplicate subjects in preferences');
        }

        res.status(200).json({
            success: true,
            valid: errors.length === 0,
            errors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error validating preferences',
            error: error.message
        });
    }
};
