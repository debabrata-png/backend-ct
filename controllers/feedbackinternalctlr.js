const User = require('../Models/user');
const feedbackinternalds = require('../Models/feedbackinternalds');
const feedbackinternalresponseds = require('../Models/feedbackinternalresponseds');
const mongoose = require('mongoose');

// Get all feedbacks with filters
exports.getallfeedbacksinternalds = async (req, res) => {
  try {
    const { colid, programcode, coursecode, year, semester } = req.query;
    
    const filter = { colid: parseInt(colid) };
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;

    const feedbacks = await feedbackinternalds.find(filter).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
  }
};

// Get single feedback
exports.getsinglefeedbackinternalds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const feedback = await feedbackinternalds.findById(feedbackId);
    res.status(200).json(feedback);
  } catch (error) {
  }
};

// Create feedback
exports.createfeedbackinternalds = async (req, res) => {
  try {
    const { colid } = req.query;
    const feedbackData = { ...req.body, colid: parseInt(colid) };
    const newFeedback = await feedbackinternalds.create(feedbackData);
    res.status(201).json(newFeedback);
  } catch (error) {
  }
};

// Update feedback
exports.updatefeedbackinternalds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const updated = await feedbackinternalds.findByIdAndUpdate(feedbackId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
  }
};

// Delete feedback
exports.deletefeedbackinternalds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    await feedbackinternalds.findByIdAndDelete(feedbackId);
    await feedbackinternalresponseds.deleteMany({ feedbackid: feedbackId });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
  }
};

// Get feedback responses
exports.getfeedbackinternalresponsesds = async (req, res) => {
  try {
    const { colid, feedbackId } = req.query;
    const filter = { colid: parseInt(colid) };
    if (feedbackId) filter.feedbackid = feedbackId;
    
    const responses = await feedbackinternalresponseds.find(filter).populate('feedbackid', 'title');
    res.status(200).json(responses);
  } catch (error) {
  }
};

// Create response
exports.createfeedbackinternalresponseds = async (req, res) => {
  try {
    const { colid } = req.query;
    const responseData = { ...req.body, colid: parseInt(colid) };
    const newResponse = await feedbackinternalresponseds.create(responseData);
    res.status(201).json({ 
      success: true, 
      message: "Feedback response submitted successfully",
      responseId: newResponse._id 
    });
  } catch (error) {
  }
};

// Get feedback analytics with rating support
exports.getfeedbackinternalanalyticsds = async (req, res) => {
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
          $unwind: "$responsesArray" 
        },
        { 
          $match: { 
            "responsesArray.v": { $exists: true, $ne: null } 
          } 
        },
        {
          $addFields: {
            numericValue: {
              $convert: {
                input: "$responsesArray.v",
                to: "int",
                onError: null,
                onNull: null
              }
            }
          }
        },
        { 
          $group: {
            _id: "$responsesArray.k",
            responses: { $push: "$responsesArray.v" },
            totalResponses: { $sum: 1 },
            // Only collect valid ratings (1-5)
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
      const stats = analyticsData.find(item => item._id === questionId);
      
      if (!stats) {
        if (question.questiontype === 'rating') {
          return {
            questionId: question._id,
            questionText: question.questiontext,
            type: question.questiontype,
            ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            averageRating: 0,
            totalResponses: 0,
            responseCount: 0
          };
        } else {
          return {
            questionId: question._id,
            questionText: question.questiontext,
            type: question.questiontype,
            responses: [],
            totalResponses: 0
          };
        }
      }

      if (question.questiontype === 'rating') {
        return {
          questionId: question._id,
          questionText: question.questiontext,
          type: question.questiontype,
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
          questionId: question._id,
          questionText: question.questiontext,
          type: question.questiontype,
          responses: stats.responses,
          totalResponses: stats.totalResponses
        };
      }
    });

    res.status(200).json({
      feedbackTitle: feedback.title,
      totalResponses: totalCount,
      questions: processedQuestions
    });

  } catch (error) {
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};