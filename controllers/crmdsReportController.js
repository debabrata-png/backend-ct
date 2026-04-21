const CrmLead = require("../Models/crmh1");
const LeadActivity = require("../Models/leadactivityds");
const PipelineStage = require("../Models/PipelineStageag");

/*
Lead Report
*/
exports.crmdsLeadReport = async (req, res) => {

    try {

        const { counselor, colid } = req.body;

        let filter = {
            colid: colid
        };

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        const leads = await CrmLead.find(filter)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



/*
Upcoming Followup Report
*/
exports.crmdsUpcomingFollowupReport = async (req, res) => {

    try {

        const { counselor, colid, startDate, endDate } = req.body;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filter = {
            colid: colid,
            next_followup_date: { $type: "date", $ne: null }
        };

        if (startDate && endDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filter.next_followup_date = { ...filter.next_followup_date, $gte: start, $lte: end };
        } else {
            filter.next_followup_date = { ...filter.next_followup_date, $gte: today };
        }

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        const leads = await CrmLead.find(filter)
            .sort({ next_followup_date: 1 });

        res.json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/*
Get Distinct Counselors
*/
exports.crmdsGetCounsellors = async (req, res) => {

    try {

        const { colid } = req.body;

        const counselors = await CrmLead.distinct(
            "assignedto",
            { colid: colid }
        );

        res.json({
            success: true,
            data: counselors
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.crmdsOverdueLeadsReport = async (req, res) => {

    try {

        const { counselor, colid } = req.body;

        const today = new Date();

        let filter = { colid };

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        const leads = await CrmLead.find(filter);

        const overdueLeads = leads.filter((lead) => {

            const pipeline = lead.pipeline_stage;

            const nextFollowup = lead.next_followup_date;

            const lastFollowup = lead.last_contact_date;

            const createdDate = lead.createdAt;

            const ageDays =
                Math.floor(
                    (today - new Date(createdDate)) /
                    (1000 * 60 * 60 * 24)
                );

            let overdue = false;

            if (pipeline === "New Lead") {
                if (nextFollowup && nextFollowup < today) {
                    overdue = true;
                }

                if (ageDays > 7 && !nextFollowup) {
                    overdue = true;
                }
            }

            return overdue;

        });

        res.json({
            success: true,
            count: overdueLeads.length,
            data: overdueLeads
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.crmdsCounsellorWiseTotalLeadsReport = async (req, res) => {

    try {

        const { counselor, startDate, endDate, colid } = req.body;

        let filter = { colid };

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const leads = await CrmLead.find(filter).sort({ createdAt: -1 });

        /*
        Create Summary for Graph
        */

        const summaryMap = {};

        leads.forEach((lead) => {

            const c = lead.assignedto || "Unassigned";

            if (!summaryMap[c]) {
                summaryMap[c] = {
                    counselor: c,
                    totalLeads: 0
                };
            }

            summaryMap[c].totalLeads++;

        });

        const summary = Object.values(summaryMap);

        res.json({
            success: true,
            totalLeads: leads.length,
            summary,
            data: leads
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.crmdsSourceWiseLeadsReport = async (req, res) => {

    try {

        const { counselor, startDate, endDate, colid } = req.body;

        let filter = { colid };

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        if (startDate && endDate) {
            filter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const leads = await CrmLead.find(filter).sort({ createdAt: -1 });

        /* SOURCE SUMMARY */

        const summaryMap = {};

        leads.forEach((lead) => {

            const src = lead.source || "Unknown";

            if (!summaryMap[src]) {

                summaryMap[src] = {
                    source: src,
                    totalLeads: 0
                };

            }

            summaryMap[src].totalLeads++;

        });

        const summary = Object.values(summaryMap);

        res.json({
            success: true,
            data: leads,
            summary
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.crmdsPipelineStageWiseReport = async (req, res) => {
    try {

        const { pipelineStage, colid, startDate, endDate } = req.body;

        let match = {
            colid: colid
        };

        if (pipelineStage && pipelineStage !== "ALL") {
            match.pipeline_stage = pipelineStage;
        }

        if (startDate && endDate) {
            match.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const result = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$assignedto",   // Group by counselor
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    counselor: { $ifNull: ["$_id", "Unassigned"] },
                    total: 1,
                    _id: 0
                }
            },
            { $sort: { total: -1 } }
        ]);

        const leads = await CrmLead.find(match).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: leads,
            summary: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.crmdsDateWiseNewLeadsReport = async (req, res) => {
    try {
        const { colid, startDate, endDate } = req.body;

        let match = {
            colid: colid
        };

        if (startDate && endDate) {
            match.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else {
            // Default 30 days if no dates provided
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            match.createdAt = { $gte: thirtyDaysAgo };
        }

        const result = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    total: 1,
                    _id: 0
                }
            },
            { $sort: { date: 1 } }
        ]);

        const leads = await CrmLead.find(match).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: leads,
            summary: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* 
1. Lead Status Report (Stage Wise)
Columns: Pipeline Stage, No. of Leads, Counsellor Name
*/
exports.crmdsLeadStatusStageReportV2 = async (req, res) => {
    try {
        const { colid, startDate, endDate, counselor } = req.body;
        let match = { colid };
        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (counselor && counselor !== "ALL") {
            match.assignedto = counselor;
        }

        const summaryRaw = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        stage: "$pipeline_stage",
                        counselor: "$assignedto"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    pipelineStage: "$_id.stage",
                    counsellorName: { $ifNull: ["$_id.counselor", "Unassigned"] },
                    noOfLeads: "$count",
                    _id: 0
                }
            }
        ]);

        // Fetch all active stages
        const allStagesDocs = await PipelineStage.find({ colid, isactive: true }).lean();
        const allStages = allStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        // Map raw data for quick lookup
        const summaryMap = {};
        summaryRaw.forEach(item => {
            const key = `${item.pipelineStage}_${item.counsellorName}`;
            summaryMap[key] = item;
        });

        // Ensure all stages are represented for the selected counselor
        const finalSummary = [];
        const counselorToUse = (counselor && counselor !== "ALL") ? counselor : "ALL";

        if (counselorToUse !== "ALL") {
            // Specific counselor: ensure all stages exist for them
            allStages.forEach(stage => {
                const key = `${stage}_${counselorToUse}`;
                if (summaryMap[key]) {
                    finalSummary.push(summaryMap[key]);
                } else {
                    finalSummary.push({
                        pipelineStage: stage,
                        counsellorName: counselorToUse,
                        noOfLeads: 0
                    });
                }
            });
        } else {
            // All counselors: for now, we just return what we have, 
            // but we add stages that have NO leads at all across all counselors
            const seenStages = new Set(summaryRaw.map(s => s.pipelineStage));
            finalSummary.push(...summaryRaw);
            allStages.forEach(stage => {
                if (!seenStages.has(stage)) {
                    finalSummary.push({
                        pipelineStage: stage,
                        counsellorName: "N/A",
                        noOfLeads: 0
                    });
                }
            });
        }

        res.json({ success: true, summary: finalSummary.sort((a,b) => a.pipelineStage.localeCompare(b.pipelineStage)), allStages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
2. Counsellor Performance Report
Columns: Counsellor, Total Leads, + one column per pipeline stage (dynamic)
*/
exports.crmdsCounsellorPerformanceReportV2 = async (req, res) => {
    try {
        const { colid, startDate, endDate } = req.body;
        let match = { colid };
        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Aggregate: group by counsellor + pipeline_stage to get counts
        const rawData = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        counsellor: "$assignedto",
                        stage: "$pipeline_stage"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.counsellor": 1 } }
        ]);

        // Pivot: build a map { counsellor -> { totalLeads, stageCounts: { stageName: count } } }
        const counsellorMap = {};
        rawData.forEach(({ _id, count }) => {
            const c = _id.counsellor || "Unassigned";
            const stage = _id.stage || "Unknown";
            if (!counsellorMap[c]) {
                counsellorMap[c] = { counsellor: c, totalLeads: 0, stageCounts: {} };
            }
            counsellorMap[c].totalLeads += count;
            counsellorMap[c].stageCounts[stage] = (counsellorMap[c].stageCounts[stage] || 0) + count;
        });

        // Sort by total leads desc
        const summary = Object.values(counsellorMap).sort((a, b) => b.totalLeads - a.totalLeads);

        // Collect all distinct stage names seen in this result
        const allStages = [...new Set(rawData.map(d => d._id.stage || "Unknown"))].sort();

        res.json({ success: true, summary, allStages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
3. Daily Calling Report
Columns: Date, Counsellor, New Leads Assigned, Calls Done, Connected, Follow Up
*/
exports.crmdsDailyCallingReportV2 = async (req, res) => {
    try {
        const { colid, startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        // 1. Get All Active Pipeline Stages for this college
        const activeStagesDocs = await PipelineStage.find({ colid, isactive: true }).lean();
        const activeStages = activeStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        // 2. Get New Leads Assigned per day per counselor
        const newLeads = await CrmLead.aggregate([
            { $match: { colid, createdAt: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        counselor: "$assignedto"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // 3. Get Activities per day per counselor, grouped by the dynamic stage (outcome)
        // Note: Outcome in LeadActivity should match the PipelineStage name for this to work perfectly.
        const activities = await LeadActivity.aggregate([
            { $match: { colid, activity_date: { $gte: start, $lte: end }, activity_type: "call" } },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$activity_date" } },
                        counselor: "$performed_by",
                        stage: "$outcome"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Merge results
        const mergedMap = {};
        
        // Initialize with new leads
        newLeads.forEach(item => {
            const key = `${item._id.date}_${item._id.counselor}`;
            if (!mergedMap[key]) {
                mergedMap[key] = {
                    date: item._id.date,
                    counsellor: item._id.counselor || "Unassigned",
                    newLeadsAssigned: 0,
                    callsDone: 0,
                    stageCounts: {}
                };
                // Initialize active stages with 0
                activeStages.forEach(s => mergedMap[key].stageCounts[s] = 0);
            }
            mergedMap[key].newLeadsAssigned = item.count;
        });

        // Add activities
        activities.forEach(item => {
            const key = `${item._id.date}_${item._id.counselor}`;
            if (!mergedMap[key]) {
                mergedMap[key] = {
                    date: item._id.date,
                    counsellor: item._id.counselor || "Unassigned",
                    newLeadsAssigned: 0,
                    callsDone: 0,
                    stageCounts: {}
                };
                activeStages.forEach(s => mergedMap[key].stageCounts[s] = 0);
            }
            mergedMap[key].callsDone += item.count;
            const stage = item._id.stage;
            if (activeStages.includes(stage)) {
                mergedMap[key].stageCounts[stage] = (mergedMap[key].stageCounts[stage] || 0) + item.count;
            }
        });

        const summary = Object.values(mergedMap).sort((a, b) => b.date.localeCompare(a.date));

        res.json({ success: true, summary, activeStages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
4. Untouched Lead Report
Columns: Lead Name, Mobile, Assigned Counsellor, Days Pending
Excludes leads in final stages (admissions)
*/
exports.crmdsUntouchedLeadReportV2 = async (req, res) => {
    try {
        const { colid, counselor } = req.body;

        // Fetch stages marked as is_final_stage (admission stages) for this colid
        const finalStagesDocs = await PipelineStage.find({ colid, isactive: true, is_final_stage: true }).lean();
        const finalStageNames = finalStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        let filter = {
            colid,
            last_contact_date: null,
            // Exclude leads in final categories or specifically "Converted" status
            leadstatus: { $ne: "Converted" },
            pipeline_stage: { $nin: finalStageNames },
            $expr: { $eq: ["$createdAt", "$updatedAt"] }
        };
        
        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        const leads = await CrmLead.find(filter).sort({ createdAt: 1 }).lean();
        const today = new Date();

        const data = leads.map(lead => ({
            leadName: lead.name,
            mobile: lead.phone || lead.mobile || "",
            assignedCounsellor: lead.assignedto || "Unassigned",
            daysPending: Math.floor((today - new Date(lead.createdAt)) / (1000 * 60 * 60 * 24))
        }));

        res.json({ success: true, data, finalStageNames });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
5. Follow-Up Due Report
Columns: Lead Name, Mobile, Counsellor, Follow-up Date, Status
Excludes leads in final stages (admissions)
*/
exports.crmdsFollowUpDueReportV2 = async (req, res) => {
    try {
        const { colid, counselor, startDate, endDate } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch stages marked as is_final_stage (admission stages) for this colid
        const finalStagesDocs = await PipelineStage.find({ colid, isactive: true, is_final_stage: true }).lean();
        const finalStageNames = finalStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        let filter = { colid };
        if (startDate && endDate) {
            filter.next_followup_date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else {
            filter.next_followup_date = { $lte: today }; // Overdue or due today
        }

        if (counselor && counselor !== "ALL") {
            filter.assignedto = counselor;
        }

        // Exclude admitted/converted leads dynamically
        filter.leadstatus = { $ne: "Converted" };
        filter.pipeline_stage = { $nin: finalStageNames };
        
        // Dynamic follow-up check: only show if NOT updated after next_followup_date
        filter.$expr = { $lte: ["$updatedAt", "$next_followup_date"] };

        const leads = await CrmLead.find(filter).sort({ next_followup_date: 1 }).lean();

        const data = leads.map(lead => ({
            leadName: lead.name,
            mobile: lead.phone || lead.mobile || "",
            counsellor: lead.assignedto || "Unassigned",
            followupDate: lead.next_followup_date,
            status: lead.pipeline_stage
        }));

        res.json({ success: true, data, finalStageNames });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
6. Source Wise Lead Report (Enhanced)
Columns: Source, Total Leads, Admissions (based on is_final_stage), Conversion %
*/
exports.crmdsSourceWiseEnhancedReportV2 = async (req, res) => {
    try {
        const { colid, startDate, endDate } = req.body;
        let match = { colid };
        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Fetch stages marked as is_final_stage (admission stages) for this colid
        const finalStagesDocs = await PipelineStage.find({ colid, isactive: true, is_final_stage: true }).lean();
        const finalStageNames = finalStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        // Aggregate: pivot by source + pipeline_stage
        const rawData = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        source: "$source",
                        stage: "$pipeline_stage"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.source": 1 } }
        ]);

        // Pivot into source map
        const sourceMap = {};
        rawData.forEach(({ _id, count }) => {
            const src = _id.source || "Unknown";
            const stage = _id.stage || "Unknown";
            if (!sourceMap[src]) {
                sourceMap[src] = { source: src, leads: 0, admissions: 0, stageCounts: {} };
            }
            sourceMap[src].leads += count;
            sourceMap[src].stageCounts[stage] = (sourceMap[src].stageCounts[stage] || 0) + count;
            if (finalStageNames.includes(stage)) {
                sourceMap[src].admissions += count;
            }
        });

        // Compute conversion %
        const summary = Object.values(sourceMap)
            .map(s => ({
                ...s,
                conversionPercent: s.leads > 0 ? +((s.admissions / s.leads) * 100).toFixed(1) : 0
            }))
            .sort((a, b) => b.leads - a.leads);

        const allStages = [...new Set(rawData.map(d => d._id.stage || "Unknown"))].sort();

        res.json({ success: true, summary, allStages, finalStageNames });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/*
7. Conversion Report
Columns: Counsellor, Leads, Admissions (based on is_final_stage), Conversion %
*/
exports.crmdsConversionReportV2 = async (req, res) => {
    try {
        const { colid, startDate, endDate } = req.body;
        let match = { colid };
        if (startDate && endDate) {
            match.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Fetch stages marked as is_final_stage (admission stages) for this colid
        const finalStagesDocs = await PipelineStage.find({ colid, isactive: true, is_final_stage: true }).lean();
        const finalStageNames = finalStagesDocs.map(s => s.stagename || s.name).filter(Boolean);

        // Aggregate: group by counsellor + stage
        const rawData = await CrmLead.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        counsellor: "$assignedto",
                        stage: "$pipeline_stage"
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.counsellor": 1 } }
        ]);

        // Pivot into counsellor map
        const counsellorMap = {};
        rawData.forEach(({ _id, count }) => {
            const c = _id.counsellor || "Unassigned";
            const stage = _id.stage || "Unknown";
            if (!counsellorMap[c]) {
                counsellorMap[c] = { counsellor: c, leads: 0, admissions: 0 };
            }
            counsellorMap[c].leads += count;
            if (finalStageNames.includes(stage)) {
                counsellorMap[c].admissions += count;
            }
        });

        const summary = Object.values(counsellorMap)
            .map(r => ({
                ...r,
                conversionPercent: r.leads > 0 ? +((r.admissions / r.leads) * 100).toFixed(1) : 0
            }))
            .sort((a, b) => b.conversionPercent - a.conversionPercent);

        res.json({ success: true, summary, finalStageNames });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};