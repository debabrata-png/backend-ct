const User = require('../Models/user');
const feedbackmodelds = require('../Models/feedbackmodelds');
const feedbackresponseds = require('../Models/feedbackresponseds');
const  mongoose  = require('mongoose');

// Get all feedbacks
exports.getallfeedbacksds = async (req, res) => {
  try {
    const { colid } = req.query;
    const feedbacks = await feedbackmodelds.find({ colid: parseInt(colid) }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
  }
};

// Get single feedback
exports.getsinglefeedbackds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const feedback = await feedbackmodelds.findById(feedbackId);
    res.status(200).json(feedback);
  } catch (error) {
  }
};

// Create feedback
exports.createfeedbackds = async (req, res) => {
  try {
    const { colid } = req.query;
    const feedbackData = { ...req.body, colid: parseInt(colid) };
    const newFeedback = await feedbackmodelds.create(feedbackData);
    res.status(201).json(newFeedback);
  } catch (error) {
  }
};

// Update feedback
exports.updatefeedbackds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const updated = await feedbackmodelds.findByIdAndUpdate(feedbackId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
  }
};

// Delete feedback
exports.deletefeedbackds = async (req, res) => {
  try {
    const { feedbackId } = req.query;
    await feedbackmodelds.findByIdAndDelete(feedbackId);
    await feedbackresponseds.deleteMany({ feedbackid: feedbackId });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
  }
};

// Get feedback responses
exports.getfeedbackresponsesds = async (req, res) => {
  try {
    const { colid, feedbackId } = req.query;
    const filter = { colid: parseInt(colid) };
    if (feedbackId) filter.feedbackid = feedbackId;
    
    const responses = await feedbackresponseds.find(filter).populate('feedbackid', 'title');
    
    res.status(200).json(responses);
  } catch (error) {
    
  }
};

// Create response
// Create feedback response
exports.createfeedbackresponseds = async (req, res) => {
  try {
    const { feedbackid, respondentname, respondentemail, responses, colid, programname, regno, department } = req.body;

    // Get colid from feedback if not provided in request body
    let feedbackColid = colid;
    if (!feedbackColid) {
      const feedback = await feedbackmodelds.findById(feedbackid);
      feedbackColid = feedback.colid;
    }

    const responseData = {
      feedbackid,
      respondentname: respondentname.trim(),
      respondentemail: respondentemail.trim(),
      programname: programname.trim(),
      regno: regno.trim(),
      department: department.trim(),
      responses,
      colid: parseInt(feedbackColid)
    };

    const newResponse = await feedbackresponseds.create(responseData);
    res.status(201).json({ 
      success: true, 
      message: "Feedback response submitted successfully",
      responseId: newResponse._id 
    });
  } catch (error) {
  }
};


// Optimized Get Feedback Analytics/Reports
exports.getfeedbackanalyticsds = async (req, res) => {
  try {
    const { colid, feedbackId } = req.query;
    if (!colid || !feedbackId) {
      return res.status(400).json({ error: "colid and feedbackId are required" });
    }

    const feedbackObjectId = new mongoose.Types.ObjectId(feedbackId);
    const colidNum = parseInt(colid);

    // Run feedback fetch and analytics in parallel
    const [feedback, aggregationResult] = await Promise.all([
      feedbackmodelds.findById(feedbackObjectId).lean(),
      feedbackresponseds.aggregate([
        { $match: { feedbackid: feedbackObjectId, colid: colidNum } },

        {
          $facet: {
            stats: [
              // Convert responses object to array
              { $addFields: { responsesArray: { $objectToArray: "$responses" } } },
              { $unwind: "$responsesArray" },
              { $match: { "responsesArray.v": { $exists: true, $ne: null } } },
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
                        $filter: { input: "$validRatings", cond: { $eq: ["$$this", 1] } }
                      }
                    },
                    rating2: {
                      $size: {
                        $filter: { input: "$validRatings", cond: { $eq: ["$$this", 2] } }
                      }
                    },
                    rating3: {
                      $size: {
                        $filter: { input: "$validRatings", cond: { $eq: ["$$this", 3] } }
                      }
                    },
                    rating4: {
                      $size: {
                        $filter: { input: "$validRatings", cond: { $eq: ["$$this", 4] } }
                      }
                    },
                    rating5: {
                      $size: {
                        $filter: { input: "$validRatings", cond: { $eq: ["$$this", 5] } }
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
            ],
            totalCount: [{ $count: "count" }]
          }
        }
      ])
    ]);

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    // Extract results
    const analyticsData = aggregationResult[0].stats;
    const totalCount = aggregationResult[0].totalCount[0]?.count || 0;

    // Map for O(1) lookup
    const analyticsMap = new Map(analyticsData.map(item => [item._id, item]));

    // Merge questions with stats
    const processedQuestions = feedback.questions.map(question => {
      const stats = analyticsMap.get(question._id.toString());

      if (!stats) {
        if (question.questiontype === "rating") {
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

      if (question.questiontype === "rating") {
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