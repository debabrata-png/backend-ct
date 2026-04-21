const reevaluationds1 = require('../Models/reevaluationds1.js');
const exammarks2ds = require('../Models/exammarks2ds.js');
const examinerconfigds = require('../Models/examinerconfigds.js');

// Helper to calculate percentage increase
function calculateincrementds(original, newmark) {
    if (original === 0) return 0;
    return ((newmark - original) / original) * 100;
}

// ✅ NEW: Custom rounding function - keeps .5 as is
function customRound(value) {
    const decimal = value - Math.floor(value);
    
    if (decimal === 0.5) {
        return value; // Keep .5 as is (e.g., 70.5 stays 70.5)
    } else if (decimal < 0.5) {
        return Math.floor(value); // Round down (e.g., 70.3 → 70)
    } else {
        return Math.ceil(value); // Round up (e.g., 70.6 → 71)
    }
}

// ==================== STUDENT FUNCTIONS ====================

// Apply for reevaluation - max 2 papers limit
exports.applyreevaluationds1 = async (req, res) => {
    try {
        const { student, regno, papers, program, colid } = req.body;

        // Check current application count for student for this program/year/semester
        const currentcount = await reevaluationds1.countDocuments({
            student,
            program: program || papers[0]?.program,
            year: papers[0]?.year,
            semester: papers[0]?.semester,
            colid: Number(colid) // ✅ Add colid filter
        });

        if (currentcount + papers.length > 2) {
            return res.status(400).json({ error: 'cannot apply for more than 2 papers for reevaluation.' });
        }

        // Create applications for each paper requested
        for (const paper of papers) {
            const existing = await reevaluationds1.findOne({
                student,
                papercode: paper.papercode,
                examcode: paper.examcode,
                year: paper.year,
                semester: paper.semester,
                colid: Number(colid) // ✅ Add colid filter
            });

            if (!existing) {
                const newapp = new reevaluationds1({
                    student,
                    regno,
                    name: req.body.name,
                    user: req.body.user,
                    colid: Number(colid), // ✅ colid as Number
                    program: paper.program || program,
                    examcode: paper.examcode,
                    month: paper.month,
                    year: paper.year,
                    regulation: paper.regulation,
                    semester: paper.semester,
                    branch: paper.branch,
                    papercode: paper.papercode,
                    papername: paper.papername,
                    originalmarks: paper.originalmarks,
                    maxmarks: paper.maxmarks,
                    examiner1status: 'pending',
                    examiner2status: 'pending',
                    examiner3status: 'pending',
                    status: 'pending',
                    applieddate: new Date()
                });
                await newapp.save();
            }
        }

        res.status(200).json({ message: 'reevaluation applications submitted successfully.' });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get all papers for a student from exammarks2ds
exports.getallpapersforstudentds1 = async (req, res) => {
    try {
        const { regno, program, branch, regulation, semester, year, colid } = req.query;
        
        const filter = {};
        if (regno) filter.regno = regno;
        if (program) filter.program = program;
        if (branch) filter.branch = branch;
        if (regulation) filter.regulation = regulation;
        if (semester) filter.semester = semester;
        if (year) filter.year = year;
        if (colid) filter.colid = Number(colid); // ✅ colid as Number
        
        filter.thmax = { $gt: 0 }; // Only papers with theory component

        const papers = await exammarks2ds.find(filter);
        res.status(200).json(papers);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get student's own applications
exports.getmyapplicationsds1 = async (req, res) => {
    try {
        const { regno, colid } = req.query;
        
        const filter = { regno };
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const applications = await reevaluationds1.find(filter).sort({ applieddate: -1 });
        res.status(200).json(applications);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get filter options for STUDENT (from exammarks2ds)
exports.getfilteroptionsforstudentds1 = async (req, res) => {
    try {
        const { colid } = req.query;
        
        const filter = {};
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const programs = await exammarks2ds.distinct('program', filter);
        const branches = await exammarks2ds.distinct('branch', filter);
        const regulations = await exammarks2ds.distinct('regulation', filter);
        const semesters = await exammarks2ds.distinct('semester', filter);
        const years = await exammarks2ds.distinct('year', filter);

        res.status(200).json({
            programs,
            years,
            semesters,
            branches,
            regulations
        });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// ==================== ADMIN FUNCTIONS ====================

// Get all applications for admin with calculations
exports.getapplicationsforadminds1 = async (req, res) => {
    try {
        const { colid } = req.query;
        
        const filter = {};
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const applications = await reevaluationds1.find(filter).sort({ applieddate: -1 });

        const datawithcalcs = applications.map(app => {
            const incr1 = app.examiner1marks ? calculateincrementds(app.originalmarks, app.examiner1marks) : null;
            const incr2 = app.examiner2marks ? calculateincrementds(app.originalmarks, app.examiner2marks) : null;
            const avgmarks = app.examiner1marks && app.examiner2marks
                ? (app.examiner1marks + app.examiner2marks) / 2
                : null;
            const avgincr = avgmarks ? calculateincrementds(app.originalmarks, avgmarks) : null;

            return {
                ...app.toObject(),
                examiner1incrementpercent: incr1,
                examiner2incrementpercent: incr2,
                averagemarks: avgmarks,
                averageincrementpercent: avgincr,
            };
        });

        res.status(200).json(datawithcalcs);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get applications with filters
exports.getapplicationswithfiltersds1 = async (req, res) => {
    try {
        const filter = {};
        if (req.query.papercode) filter.papercode = req.query.papercode;
        if (req.query.examcode) filter.examcode = req.query.examcode;
        if (req.query.program) filter.program = req.query.program;
        if (req.query.year) filter.year = req.query.year;
        if (req.query.semester) filter.semester = req.query.semester;
        if (req.query.branch) filter.branch = req.query.branch;
        if (req.query.regulation) filter.regulation = req.query.regulation;
        if (req.query.colid) filter.colid = Number(req.query.colid); // ✅ Add colid filter

        const applications = await reevaluationds1.find(filter).sort({ applieddate: -1 });

        const datawithcalcs = applications.map(app => {
            const incr1 = app.examiner1marks ? calculateincrementds(app.originalmarks, app.examiner1marks) : null;
            const incr2 = app.examiner2marks ? calculateincrementds(app.originalmarks, app.examiner2marks) : null;
            const avgmarks = app.examiner1marks && app.examiner2marks
                ? (app.examiner1marks + app.examiner2marks) / 2
                : null;
            const avgincr = avgmarks ? calculateincrementds(app.originalmarks, avgmarks) : null;

            return {
                ...app.toObject(),
                examiner1incrementpercent: incr1,
                examiner2incrementpercent: incr2,
                averagemarks: avgmarks,
                averageincrementpercent: avgincr,
            };
        });

        res.status(200).json(datawithcalcs);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get filter options for ADMIN (from reevaluationds1)
exports.getfilteroptionsforadminds1 = async (req, res) => {
    try {
        const { colid } = req.query;
        
        const filter = {};
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const papercodes = await reevaluationds1.distinct('papercode', filter);
        const examcodes = await reevaluationds1.distinct('examcode', filter);
        const programs = await reevaluationds1.distinct('program', filter);
        const branches = await reevaluationds1.distinct('branch', filter);
        const regulations = await reevaluationds1.distinct('regulation', filter);
        const semesters = await reevaluationds1.distinct('semester', filter);
        const years = await reevaluationds1.distinct('year', filter);

        res.status(200).json({
            papercodes,
            examcodes,
            programs,
            years,
            semesters,
            branches,
            regulations
        });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Admin bulk allocation with random assignment from examinerconfigds
exports.bulkallocateexaminerds1 = async (req, res) => {
    try {
        const { applicationids, examinernumber, colid } = req.body;
        const examinerkey = `examiner${examinernumber}`;

        if (![1, 2, 3].includes(examinernumber)) {
            return res.status(400).json({ error: 'invalid examiner number' });
        }

        const apps = await reevaluationds1.find({ 
            _id: { $in: applicationids },
            colid: Number(colid) // ✅ Add colid filter
        });

        let successcount = 0;
        let failcount = 0;

        for (const app of apps) {
            // Find matching examiner configs
            const configs = await examinerconfigds.find({
                papercode: app.papercode,
                examcode: app.examcode,
                program: app.program,
                branch: app.branch,
                semester: app.semester,
                regulation: app.regulation,
                colid: Number(colid) // ✅ Add colid filter
            });

            // Get all available examiners of this type
            const availableexaminers = configs
                .map(config => config[examinerkey])
                .filter(examiner => examiner && examiner !== '');

            if (availableexaminers.length === 0) {
                failcount++;
                continue;
            }

            // Random assignment
            const randomexaminer = availableexaminers[Math.floor(Math.random() * availableexaminers.length)];
            app[`${examinerkey}id`] = randomexaminer;
            app[`${examinerkey}status`] = 'allocated';
            
            if (examinernumber === 1 || examinernumber === 2) {
                app.status = 'stage1';
            }

            await app.save();
            successcount++;
        }

        res.status(200).json({
            message: 'bulk allocation completed',
            success: successcount,
            failed: failcount
        });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Get applications requiring examiner 3 (increment > 20%)
exports.getapplicationsforexaminer3ds1 = async (req, res) => {
    try {
        const { colid } = req.query;
        
        const filter = {
            examiner1status: 'completed',
            examiner2status: 'completed',
            status: 'stage2',
            examiner3status: 'pending'
        };
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const applications = await reevaluationds1.find(filter);

        const datawithcalcs = applications.map(app => {
            const avgmarks = (app.examiner1marks + app.examiner2marks) / 2;
            const avgincr = calculateincrementds(app.originalmarks, avgmarks);

            return {
                ...app.toObject(),
                averagemarks: avgmarks,
                averageincrementpercent: avgincr,
            };
        }).filter(app => app.averageincrementpercent > 20);

        res.status(200).json(datawithcalcs);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// ==================== EXAMINER FUNCTIONS ====================

// Get applications assigned to specific examiner
exports.getexaminerassignedapplicationsds1 = async (req, res) => {
    try {
        const { examineremail, examinernumber, colid } = req.query;
        const examinerkey = `examiner${examinernumber}`;

        const filter = {
            [`${examinerkey}id`]: examineremail,
            [`${examinerkey}status`]: 'allocated'
        };
        if (colid) filter.colid = Number(colid); // ✅ Add colid filter
        
        const applications = await reevaluationds1.find(filter);
        res.status(200).json(applications);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Examiner submits marks for reevaluation
exports.submitexaminermarksds1 = async (req, res) => {
    try {
        const { applicationid, examinernumber, marks } = req.body;
        const examinerkey = `examiner${examinernumber}`;

        const application = await reevaluationds1.findById(applicationid);

        if (!application) {
            return res.status(404).json({ error: 'application not found' });
        }

        // Set marks and status
        application[`${examinerkey}marks`] = marks;
        application[`${examinerkey}status`] = 'completed';

        // Logic after examiner 2 submits (both examiner 1 and 2 completed)
        if (examinernumber === 2 && application.examiner1status === 'completed') {
            const avgmarks = (application.examiner1marks + application.examiner2marks) / 2;
            const incrementpercent = calculateincrementds(application.originalmarks, avgmarks);

            // ✅ LOGIC 1: Increment range handling
            if (incrementpercent >= 0 && incrementpercent < 10) {
                // Increment 0-10% - Keep original marks (NO UPDATE)
                application.finalmarks = application.originalmarks;
                application.remarksds = 'no change - increment less than 10%';
                application.status = 'completed';
                application.completeddate = new Date();
                // ✅ Don't call updateexammarks2ds - no change needed
            } else if (incrementpercent < 0) {
                // ✅ LOGIC 2: Marks decreased - check if student passed
                application.finalmarks = customRound(avgmarks); // ✅ Use custom rounding
                application.remarksds = 'marks decreased - applying new marks based on pass/fail status';
                application.status = 'completed';
                application.completeddate = new Date();
                await updateexammarks2ds(application, avgmarks); // Will check pass/fail inside
            } else if (incrementpercent >= 10 && incrementpercent <= 20) {
                // Increment 10-20% - Use average marks
                application.finalmarks = customRound(avgmarks); // ✅ Use custom rounding
                application.remarksds = 'average marks applied - increment between 10-20%';
                application.status = 'completed';
                application.completeddate = new Date();
                await updateexammarks2ds(application, avgmarks);
            } else {
                // Increment > 20% - needs examiner 3
                application.examiner3status = 'pending';
                application.status = 'stage2';
                application.remarksds = 'increment greater than 20% - needs examiner 3 evaluation';
            }
        }

        // If examiner 1 submits (just mark as completed, wait for examiner 2)
        if (examinernumber === 1) {
            application.status = 'stage1';
        }

        // If examiner 3 submits - Calculate average of all 3 examiners
        if (examinernumber === 3) {
            const avgmarks = (application.examiner1marks + application.examiner2marks + marks) / 3;
            application.finalmarks = customRound(avgmarks); // ✅ Use custom rounding
            application.remarksds = 'examiner 3 evaluation completed - average of all 3 examiners';
            application.status = 'completed';
            application.completeddate = new Date();
            application.examiner3status = 'completed';

            // Update exammarks2ds with new marks
            await updateexammarks2ds(application, avgmarks);
        }

        await application.save();
        res.status(200).json({ message: 'marks submitted successfully', application });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Helper function to update exammarks2ds
async function updateexammarks2ds(application, newmarks) {
    try {
        // Find the student's marks record
        const marksrecord = await exammarks2ds.findOne({
            regno: application.regno,
            papercode: application.papercode,
            examcode: application.examcode,
            program: application.program,
            branch: application.branch,
            semester: application.semester,
            regulation: application.regulation,
            year: application.year,
            colid: application.colid // ✅ Add colid filter
        });

        if (!marksrecord) {
            // console.log('marks record not found for update');
            return;
        }

        // Get all mark components
        const originalTheoryMarks = marksrecord.thobtained || 0;
        const thmax = marksrecord.thmax || 0;
        const probtained = marksrecord.probtained || 0;
        const prmax = marksrecord.prmax || 0;
        const iatobtained = marksrecord.iatobtained || 0;
        const iatmax = marksrecord.iatmax || 0;
        const iapobtained = marksrecord.iapobtained || 0;
        const iapmax = marksrecord.iapmax || 0;

        // Calculate original total marks and percentage
        const originalTotal = originalTheoryMarks + probtained + iatobtained + iapobtained;
        const maxTotal = thmax + prmax + iatmax + iapmax;
        const originalPercentage = maxTotal > 0 ? (originalTotal / maxTotal) * 100 : 0;

        // Check if student PASSED originally (>= 36% as per UGC grading)
        const isPassed = originalPercentage >= 36;

        // console.log(`Student ${application.regno} - ${application.papercode}:`);
        // console.log(`Original Theory: ${originalTheoryMarks}, New: ${newmarks}, Max: ${thmax}`);
        // console.log(`Original Total: ${originalTotal}/${maxTotal} = ${originalPercentage.toFixed(2)}%`);
        // console.log(`Status: ${isPassed ? 'PASSED' : 'FAILED'}`);
        // console.log(`Status: ${isPassed ? 'PASSED' : 'FAILED'}`);

        // ✅ LOGIC 2 & 3: Apply mark update logic with custom rounding
        if (newmarks < originalTheoryMarks) {
            // Marks decreased
            if (isPassed) {
                // Student PASSED originally - UPDATE with decreased marks
                marksrecord.thobtained = customRound(newmarks); // ✅ Use custom rounding
                await marksrecord.save();
                // console.log(`✅ Marks updated (decreased) for PASSED student: ${customRound(newmarks)}`);
            } else {
                // Student FAILED originally - NO CHANGE
                // console.log(`❌ No update - Student FAILED originally`);
            }
        } else {
            // Marks increased or same - ALWAYS UPDATE
            marksrecord.thobtained = customRound(newmarks); // ✅ Use custom rounding
            await marksrecord.save();
            // console.log(`✅ Marks updated (increased): ${customRound(newmarks)}`);
        }
    } catch (err) {
        console.error('error updating exammarks2ds:', err);
    }
}
