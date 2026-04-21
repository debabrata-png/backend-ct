const User = require('../Models/user');
const feedbackinternalds = require('../Models/feedbackinternalds1');
const feedbackinternalresponseds = require('../Models/feedbackinternalresponseds1');
const mongoose = require('mongoose');

// Get all feedbacks with filters
exports.getallfeedbacksinternalds1 = async (req, res) => {
  try {
    const { colid, programcode, coursecode, year, semester } = req.query;
    
    const filter = { colid: parseInt(colid) };
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;

    const feedbacks = await feedbackinternalds.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(feedbacks);
  } catch (error) {
  }
};

// Get single feedback
exports.getsinglefeedbackinternalds1 = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const feedback = await feedbackinternalds.findById(feedbackId);
    return res.status(200).json(feedback);
  } catch (error) {
  }
};

// Create feedback
exports.createfeedbackinternalds1 = async (req, res) => {
  try {
    const { colid } = req.query;
    const feedbackData = { ...req.body, colid: parseInt(colid) };
    const newFeedback = await feedbackinternalds.create(feedbackData);
    return res.status(201).json(newFeedback);
  } catch (error) {
  }
};

// Update feedback
exports.updatefeedbackinternalds1 = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const updated = await feedbackinternalds.findByIdAndUpdate(feedbackId, req.body, { new: true });
    return res.status(200).json(updated);
  } catch (error) {
  }
};

// Delete feedback
exports.deletefeedbackinternalds1 = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    await feedbackinternalds.findByIdAndDelete(feedbackId);
    await feedbackinternalresponseds.deleteMany({ feedbackid: feedbackId });
    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
  }
};

// Get feedback responses
exports.getfeedbackinternalresponsesds1 = async (req, res) => {
  try {
    const { colid, feedbackId } = req.query;
    const filter = { colid: parseInt(colid) };
    if (feedbackId) filter.feedbackid = feedbackId;
    
    const responses = await feedbackinternalresponseds.find(filter).populate('feedbackid', 'title');
    return res.status(200).json(responses);
  } catch (error) {
  }
};

// Updated Create response - Auto-populate CO/PO ratings from question responses
exports.createfeedbackinternalresponseds1 = async (req, res) => {
  try {
    const { colid } = req.query;
    const responseData = { ...req.body, colid: parseInt(colid) };
    
    // Get feedback details to extract CO/PO mappings
    const feedback = await feedbackinternalds.findById(responseData.feedbackid);

    // Auto-populate CO and PO ratings from regular responses
    const coratings = {};
    const poratings = {};

    feedback.questions.forEach(question => {
      const questionId = question._id.toString();
      const questionResponse = responseData.responses[questionId];
      
      // If question has a rating response
      if (questionResponse && question.questiontype === 'rating') {
        // Map to CO ratings
        if (question.co) {
          const coArray = question.co.split(',').map(co => co.trim());
          coArray.forEach(co => {
            coratings[co] = parseInt(questionResponse);
          });
        }
        
        // Map to PO ratings
        if (question.po) {
          const poArray = question.po.split(',').map(po => po.trim());
          poArray.forEach(po => {
            poratings[po] = parseInt(questionResponse);
          });
        }
      }
    });

    // Add auto-populated CO/PO ratings to response data
    responseData.coratings = coratings;
    responseData.poratings = poratings;

    const newResponse = await feedbackinternalresponseds.create(responseData);
    return res.status(201).json({ 
      success: true, 
      message: "Feedback response submitted successfully",
      responseId: newResponse._id 
    });
  } catch (error) {
  }
};

// Updated analytics method
exports.getfeedbackinternalanalyticsds1 = async (req, res) => {
  try {
    const { colid, feedbackId } = req.query;

    const feedbackObjectId = new mongoose.Types.ObjectId(feedbackId);
    const colidNum = parseInt(colid);

    const [feedback, analyticsData, totalCount] = await Promise.all([
      feedbackinternalds.findById(feedbackObjectId).lean(),
      
      feedbackinternalresponseds.aggregate([
        { 
          $match: { 
            feedbackid: feedbackObjectId, 
            colid: colidNum 
          } 
        },
        { 
          $project: { 
            responses: 1
          } 
        },
        { 
          $addFields: { 
            responsesArray: { $objectToArray: "$responses" }
          } 
        },
        {
          $project: {
            allResponses: {
              $map: { 
                input: "$responsesArray", 
                as: "item", 
                in: { 
                  questionId: "$$item.k", 
                  value: "$$item.v", 
                  type: "regular" 
                } 
              }
            }
          }
        },
        { 
          $unwind: "$allResponses" 
        },
        { 
          $match: { 
            "allResponses.value": { $exists: true, $ne: null, $ne: "" } 
          } 
        },
        {
          $addFields: {
            numericValue: {
              $convert: {
                input: "$allResponses.value",
                to: "int",
                onError: null,
                onNull: null
              }
            }
          }
        },
        { 
          $group: {
            _id: {
              questionId: "$allResponses.questionId"
            },
            responses: { $push: "$allResponses.value" },
            totalResponses: { $sum: 1 },
            ratingValues: {
              $push: {
                $cond: [
                  {
                    $and: [
                      { $gte: ["$numericValue", 1] },
                      { $lte: ["$numericValue", 5] }
                    ]
                  },
                  "$numericValue",
                  null
                ]
              }
            }
          }
        },
        {
          $addFields: {
            validRatings: {
              $filter: {
                input: "$ratingValues",
                as: "rating",
                cond: { $ne: ["$$rating", null] }
              }
            }
          }
        },
        {
          $project: {
            responses: 1,
            totalResponses: 1,
            ratingCounts: {
              rating1: { 
                $size: { 
                  $filter: { 
                    input: "$validRatings", 
                    cond: { $eq: ["$$this", 1] } 
                  } 
                } 
              },
              rating2: { 
                $size: { 
                  $filter: { 
                    input: "$validRatings", 
                    cond: { $eq: ["$$this", 2] } 
                  } 
                } 
              },
              rating3: { 
                $size: { 
                  $filter: { 
                    input: "$validRatings", 
                    cond: { $eq: ["$$this", 3] } 
                  } 
                } 
              },
              rating4: { 
                $size: { 
                  $filter: { 
                    input: "$validRatings", 
                    cond: { $eq: ["$$this", 4] } 
                  } 
                } 
              },
              rating5: { 
                $size: { 
                  $filter: { 
                    input: "$validRatings", 
                    cond: { $eq: ["$$this", 5] } 
                  } 
                } 
              }
            },
            avgRating: {
              $cond: [
                { $gt: [{ $size: "$validRatings" }, 0] },
                { $round: [{ $avg: "$validRatings" }, 2] },
                0
              ]
            }
          }
        }
      ]),

      feedbackinternalresponseds.countDocuments({ 
        feedbackid: feedbackObjectId, 
        colid: colidNum 
      })
    ]);

    const processedQuestions = feedback.questions.map(question => {
      const questionId = question._id.toString();
      
      const regularStats = analyticsData.find(item => 
        item._id.questionId === questionId
      );

      const processStats = (stats) => {
        if (!stats) {
          if (question.questiontype === 'rating') {
            return {
              ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
              averageRating: 0,
              totalResponses: 0,
              responseCount: 0
            };
          } else {
            return {
              responses: [],
              totalResponses: 0
            };
          }
        }

        if (question.questiontype === 'rating') {
          return {
            ratingCounts: {
              1: stats.ratingCounts.rating1,
              2: stats.ratingCounts.rating2,
              3: stats.ratingCounts.rating3,
              4: stats.ratingCounts.rating4,
              5: stats.ratingCounts.rating5
            },
            averageRating: stats.avgRating,
            totalResponses: stats.totalResponses,
            responseCount: stats.totalResponses
          };
        } else {
          return {
            responses: stats.responses,
            totalResponses: stats.totalResponses
          };
        }
      };

      return {
        questionId: question._id,
        questionText: question.questiontext,
        type: question.questiontype,
        co: question.co,
        po: question.po,
        regular: processStats(regularStats)
      };
    });

    return res.status(200).json({
      feedbackTitle: feedback.title,
      totalResponses: totalCount,
      questions: processedQuestions
    });

  } catch (error) {
  }
};

// Fixed CO Report - Shows average ratings for each CO across all feedbacks
exports.getcorepositoryds1 = async (req, res) => {
  try {
    const { colid, programcode, year, coursecode } = req.query;

    const coReport = await feedbackinternalresponseds.aggregate([
      // Stage 1: Match responses with the filters
      {
        $match: {
          colid: parseInt(colid),
          programcode: programcode,
          year: year,
          coursecode: coursecode,
          coratings: { $exists: true, $ne: null, $ne: {} }
        }
      },
      
      // Stage 2: Project and convert coratings object to array
      {
        $project: {
          respondentname: 1,
          coratings: 1,
          coArray: { $objectToArray: "$coratings" }
        }
      },
      
      // Stage 3: Unwind CO ratings
      {
        $unwind: "$coArray"
      },
      
      // Stage 4: Filter valid ratings (1-5)
      {
        $match: {
          "coArray.v": { $gte: 1, $lte: 5 }
        }
      },
      
      // Stage 5: Group by CO
      {
        $group: {
          _id: "$coArray.k", // CO name (CO1, CO2, etc.)
          totalRatings: { $sum: 1 },
          averageRating: { $avg: "$coArray.v" },
          ratingCounts: { $push: "$coArray.v" },
          respondents: { $addToSet: "$respondentname" }
        }
      },
      
      // Stage 6: Calculate rating distribution
      {
        $addFields: {
          ratingDistribution: {
            rating1: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 1] } } } },
            rating2: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 2] } } } },
            rating3: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 3] } } } },
            rating4: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 4] } } } },
            rating5: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 5] } } } }
          },
          uniqueRespondents: { $size: "$respondents" }
        }
      },
      
      // Stage 7: Final projection
      {
        $project: {
          _id: 1,
          totalRatings: 1,
          averageRating: { $round: ["$averageRating", 2] },
          ratingDistribution: 1,
          uniqueRespondents: 1
        }
      },
      
      // Stage 8: Sort by CO name
      {
        $sort: { _id: 1 }
      }
    ]);

    return res.status(200).json({
      programcode,
      year,
      coursecode,
      coData: coReport
    });

  } catch (error) {
  }
};

// Fixed PO Report - Shows average ratings for each PO across all feedbacks
exports.getporepositoryds1 = async (req, res) => {
  try {
    const { colid, programcode, year } = req.query;

    const poReport = await feedbackinternalresponseds.aggregate([
      // Stage 1: Match responses with the filters
      {
        $match: {
          colid: parseInt(colid),
          programcode: programcode,
          year: year,
          poratings: { $exists: true, $ne: null, $ne: {} }
        }
      },
      
      // Stage 2: Project and convert poratings object to array
      {
        $project: {
          respondentname: 1,
          coursecode: 1,
          poratings: 1,
          poArray: { $objectToArray: "$poratings" }
        }
      },
      
      // Stage 3: Unwind PO ratings
      {
        $unwind: "$poArray"
      },
      
      // Stage 4: Filter valid ratings (1-5)
      {
        $match: {
          "poArray.v": { $gte: 1, $lte: 5 }
        }
      },
      
      // Stage 5: Group by PO
      {
        $group: {
          _id: "$poArray.k", // PO name (PO1, PO2, etc.)
          totalRatings: { $sum: 1 },
          averageRating: { $avg: "$poArray.v" },
          ratingCounts: { $push: "$poArray.v" },
          respondents: { $addToSet: "$respondentname" },
          courses: { $addToSet: "$coursecode" }
        }
      },
      
      // Stage 6: Calculate rating distribution
      {
        $addFields: {
          ratingDistribution: {
            rating1: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 1] } } } },
            rating2: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 2] } } } },
            rating3: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 3] } } } },
            rating4: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 4] } } } },
            rating5: { $size: { $filter: { input: "$ratingCounts", cond: { $eq: ["$$this", 5] } } } }
          },
          uniqueRespondents: { $size: "$respondents" }
        }
      },
      
      // Stage 7: Final projection
      {
        $project: {
          _id: 1,
          totalRatings: 1,
          averageRating: { $round: ["$averageRating", 2] },
          ratingDistribution: 1,
          uniqueRespondents: 1,
          courses: 1
        }
      },
      
      // Stage 8: Sort by PO name
      {
        $sort: { _id: 1 }
      }
    ]);

    return res.status(200).json({
      programcode,
      year,
      poData: poReport
    });

  } catch (error) {
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    
    const { colid, name, email: userEmail, regno, role } = user;
    res.status(200).json({ 
      success: true,
      colid, 
      name, 
      email: userEmail, 
      regno, 
      role 
    });
  } catch (error) {
  }
};
