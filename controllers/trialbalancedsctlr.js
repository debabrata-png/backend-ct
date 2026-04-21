const Accountds = require('../Models/accountds');
const Mjournal2 = require('../Models/mjournal2');
const Mtrialbalance2 = require('../Models/mtrialbalance2');
const AccountGroup = require('../Models/accountgroupds');

// Utility function to clear previous trial balance entries efficiently
const clearOldTrialBalances = async (colid, year) => {
  try {
    let filter = { colid: parseInt(colid) };
    if (year) {
      filter.year = year;
    }

    // Use deleteMany directly with filter - more efficient than finding IDs first
    const result = await Mtrialbalance2.deleteMany(filter);
    //console.log(`Deleted ${result.deletedCount} old trial balance entries`);
    
    return result.deletedCount;
  } catch (error) {
    // console.error('Error clearing old trial balances:', error);
    // throw error;
  }
};

// Optimized trial balance generation with aggregation pipeline
exports.dsgeneratetrialbalance = async (req, res) => {
  try {
    const { colid, year, startDate, endDate } = req.query;
    
    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'colid is required'
      });
    }

    // Step 1: Clear old trial balance entries first
    await clearOldTrialBalances(colid, year);

    // Step 2: Build filter criteria for aggregation
    let matchCriteria = { colid: parseInt(colid) };
    
    if (year) {
      matchCriteria.year = year;
    }
    
    if (startDate && endDate) {
      matchCriteria.activitydate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Step 3: Optimized aggregation pipeline for trial balance generation
    const trialBalancePipeline = [
      // Stage 1: Filter documents
      { $match: matchCriteria },
      
      // Stage 2: Group and calculate totals
      { 
        $group: {
          _id: {
            account: "$account",
            accgroup: "$accgroup", 
            acctype: "$acctype"
          },
          totalDebit: { $sum: "$debit" },
          totalCredit: { $sum: "$credit" },
          entryCount: { $sum: 1 },
          // Include additional fields needed for mtrialbalance2
          // name: { $first: "$name" },
          // user: { $first: "$user" },
          // colid: { $first: "$colid" },
          // year: { $first: "$year" },
          cogs: { $first: "$cogs" }
        }
      },
      
      // Stage 3: Calculate net balance and prepare for insertion
      { 
        $addFields: {
          netBalance: { $subtract: ["$totalDebit", "$totalCredit"] },
          amount: { 
            $abs: { $subtract: ["$totalDebit", "$totalCredit"] } 
          }
        }
      },
      
      // Stage 4: Reshape for output and mtrialbalance2 storage
      { 
        $project: {
          _id: 0,
          account: "$_id.account",
          accgroup: "$_id.accgroup",
          acctype: "$_id.acctype", 
          totalDebit: 1,
          totalCredit: 1,
          entryCount: 1,
          netBalance: 1,
          // Fields for mtrialbalance2 insertion
          // name: 1,
          // user: 1,
          // colid: 1,
          // year: 1,
          cogs: 1,
          amount: 1,
          debit: "$totalDebit",
          credit: "$totalCredit",
          status1: { $literal: "Generated" },
          comments: { 
            $concat: [
              "Trial Balance generated on ", 
              { $dateToString: { date: "$$NOW" } }
            ]
          }
        }
      },
      
      // Stage 5: Sort by account group and account name
      { $sort: { accgroup: 1, account: 1 } }
    ];

    // Step 4: Execute aggregation pipeline
    const trialBalanceData = await Mjournal2.aggregate(trialBalancePipeline);

    // Step 5: Calculate summary using aggregation (efficient)
    const summaryPipeline = [
      { $match: matchCriteria },
      { 
        $group: {
          _id: null,
          totalDebit: { $sum: "$debit" },
          totalCredit: { $sum: "$credit" },
          totalEntries: { $sum: 1 },
          uniqueAccounts: { $addToSet: "$account" }
        }
      },
      {
        $project: {
          _id: 0,
          grandTotalDebit: "$totalDebit",
          grandTotalCredit: "$totalCredit",
          totalEntries: 1,
          totalAccounts: { $size: "$uniqueAccounts" },
          difference: { $subtract: ["$totalDebit", "$totalCredit"] },
          isBalanced: { 
            $lte: [
              { $abs: { $subtract: ["$totalDebit", "$totalCredit"] } }, 
              0.01
            ]
          }
        }
      }
    ];

    const summaryResult = await Mjournal2.aggregate(summaryPipeline);
    const summary = summaryResult[0] || {
      grandTotalDebit: 0,
      grandTotalCredit: 0,
      totalEntries: 0,
      totalAccounts: 0,
      difference: 0,
      isBalanced: true
    };

    // Step 6: Bulk insert to mtrialbalance2 using insertMany (efficient)
    if (trialBalanceData.length > 0) {
      await Mtrialbalance2.insertMany(trialBalanceData, { ordered: false });
    }

    // Step 7: Return response with formatted data for frontend
    const responseData = trialBalanceData.map((item, index) => ({
      srNo: index + 1,
      account: item.account,
      accgroup: item.accgroup,
      acctype: item.acctype,
      totalDebit: item.totalDebit,
      totalCredit: item.totalCredit,
      netBalance: item.netBalance,
      entryCount: item.entryCount
    }));

    return res.status(200).json({
      success: true,
      data: {
        trialBalance: responseData,
        summary: summary
      }
    });

  } catch (error) {
    console.error('Error generating trial balance:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating trial balance',
      error: error.message
    });
  }
};

// Additional controller to fetch saved trial balance from mtrialbalance2
exports.dsgettrialbalance = async (req, res) => {
  try {
    const { colid, year } = req.query;
    
    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'colid is required'
      });
    }

    let filter = { colid: parseInt(colid) };
    if (year) {
      filter.year = year;
    }

    const trialBalanceData = await Mtrialbalance2.find(filter).sort({ accgroup: 1, account: 1 });

    const formattedData = trialBalanceData.map((item, index) => ({
      ...item.toObject(),
      id: item._id,
      srNo: index + 1,
      totalDebit: item.debit,
      totalCredit: item.credit,
      netBalance: item.debit - item.credit,
      entryCount: 1
    }));

    // Calculate summary
    const grandTotalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
    const grandTotalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);

    const summary = {
      totalAccounts: trialBalanceData.length,
      grandTotalDebit,
      grandTotalCredit,
      difference: grandTotalDebit - grandTotalCredit,
      isBalanced: Math.abs(grandTotalDebit - grandTotalCredit) < 0.01
    };

    return res.status(200).json({
      success: true,
      data: {
        trialBalance: formattedData,
        summary: summary
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trial balance',
      error: error.message
    });
  }
};

// CORRECTED Balance Sheet Controller
exports.dsgeneratebalancesheet = async (req, res) => {
  try {
    const { colid, year, startDate, endDate } = req.query;
    
    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'colid is required'
      });
    }

    let matchCriteria = { colid: parseInt(colid) };
    if (year) matchCriteria.year = year;
    if (startDate && endDate) {
      matchCriteria.activitydate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const balanceSheetPipeline = [
      { $match: matchCriteria },
      { 
        $group: {
          _id: {
            account: "$account",
            accgroup: "$accgroup",
            acctype: "$acctype"
          },
          totalDebit: { $sum: "$debit" },
          totalCredit: { $sum: "$credit" },
          entryCount: { $sum: 1 }
        }
      },
      {
        $addFields: {
          finalBalance: {
            $cond: {
              if: { $eq: ["$_id.acctype", "Asset"] },
              then: { $subtract: ["$totalDebit", "$totalCredit"] }, // Assets have debit balances
              else: { $subtract: ["$totalCredit", "$totalDebit"] }   // Liabilities have credit balances
            }
          }
        }
      },
      {
        $match: {
          finalBalance: { $gt: 0 }
        }
      },
      {
        $project: {
          _id: 0,
          account: "$_id.account",
          accgroup: "$_id.accgroup",
          acctype: "$_id.acctype",
          totalDebit: 1,
          totalCredit: 1,
          finalBalance: 1,
          entryCount: 1
        }
      },
      { $sort: { acctype: 1, accgroup: 1, account: 1 } }
    ];

    const balanceSheetData = await Mjournal2.aggregate(balanceSheetPipeline);

    // CORRECT FILTERING - Only Assets and Liabilities
    const assets = balanceSheetData.filter(item => 
      item.acctype === 'Asset' // Only Asset accounts
    );
    
    const liabilities = balanceSheetData.filter(item => 
      item.acctype === 'Liability' // ONLY Liability accounts (exclude Income/Expenditure)
    );

    const totalAssets = assets.reduce((sum, item) => sum + item.finalBalance, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.finalBalance, 0);
    
    // Group assets by subcategory
    const currentAssets = assets.filter(item => 
      ['Cash', 'Bank', 'Inventory', 'Receivable', 'Short'].some(keyword => 
        item.accgroup.toLowerCase().includes(keyword.toLowerCase()) || 
        item.account.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    const fixedAssets = assets.filter(item => !currentAssets.includes(item));
    
    // Group liabilities by subcategory
    const currentLiabilities = liabilities.filter(item => 
      ['Payable', 'Short', 'Current', 'Accrued'].some(keyword => 
        item.accgroup.toLowerCase().includes(keyword.toLowerCase()) || 
        item.account.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    const longTermLiabilities = liabilities.filter(item => !currentLiabilities.includes(item));

    const summary = {
      totalAssets,
      totalLiabilities,
      difference: totalAssets - totalLiabilities,
      isBalanced: Math.abs(totalAssets - totalLiabilities) < 0.01,
      assetCount: assets.length,
      liabilityCount: liabilities.length,
      currentAssetsTotal: currentAssets.reduce((sum, item) => sum + item.finalBalance, 0),
      fixedAssetsTotal: fixedAssets.reduce((sum, item) => sum + item.finalBalance, 0),
      currentLiabilitiesTotal: currentLiabilities.reduce((sum, item) => sum + item.finalBalance, 0),
      longTermLiabilitiesTotal: longTermLiabilities.reduce((sum, item) => sum + item.finalBalance, 0)
    };

    return res.status(200).json({
      success: true,
      data: {
        assets: {
          currentAssets,
          fixedAssets,
          total: totalAssets
        },
        liabilities: {
          currentLiabilities,
          longTermLiabilities,
          total: totalLiabilities
        },
        summary
      }
    });

  } catch (error) {
    console.error('Error generating balance sheet:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating balance sheet',
      error: error.message
    });
  }
};
