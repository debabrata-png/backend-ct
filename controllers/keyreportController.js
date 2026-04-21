// const KeiResponse = require("../models/keykeiresponse2");
const KeiResponse = require("./../Models/keiresponseModel2");

exports.keyGetDropdown = async(req,res)=>{

    const colid = req.query.colid;

    const faculty = await KeiResponse.distinct("user",{colid});
    const years = await KeiResponse.distinct("year",{colid});

    res.json({
        faculty,
        years
    });

};

exports.keyGetReport = async(req,res)=>{

    const {faculty,year,colid} = req.query;

    const match = {
        user:faculty,
        year:year,
        colid:Number(colid)
    };

    const categoryData = await KeiResponse.aggregate([

        {$match:match},

        {
            $group:{
                _id:"$category",
                avgScore:{$avg:"$score"},
                totalScore:{$sum:"$score"},
                count:{$sum:1}
            }
        },

        {$sort:{_id:1}}

    ]);



    const questionData = await KeiResponse.aggregate([

        {$match:match},

        {
            $group:{
                _id:"$question",
                avgScore:{$avg:"$score"},
                totalScore:{$sum:"$score"},
                count:{$sum:1}
            }
        },

        {$sort:{_id:1}}

    ]);



    res.json({
        categoryData,
        questionData
    });

};