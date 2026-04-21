const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/user");
const Kpi = require("./../Models/kpi");

const AWS = require('aws-sdk');

const projects = require("./../Models/projects");
const quotanew = require("./../Models/quotanew");

const { OpenAI } = require("openai");


const openai = new OpenAI({ apiKey: 'sk-proj-fYj1OWTIIy7pFnPYkQFYT3BlbkFJfbDOJvhM79AYuDRWN9Qg' });



//const client = new OpenAI({ apiKey: 'sk-proj-fYj1OWTIIy7pFnPYkQFYT3BlbkFJfbDOJvhM79AYuDRWN9Qg' });


exports.getresponse3 = async (req, res) => {
  try {

     //const prompt='Create 20 difficult competency based MCQ with answers and explanations and 20 difficult competency based short answer type questions with answers and explanations and 20 competency based case studies with answers on ' + module + ' with focus on ' + topic + ' and ' + keywords;
    console.log('starting');

    var result1='';

//    const response = await openai.responses.create({
//     model: "gpt-4.1",
//     input: "Write a one-sentence bedtime story about a unicorn."
// });

// console.log(response.output_text);

//       var result=response.output_text;

      

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: result1,
      },
    });
  } catch (err) {
    /* res.status(400).json({
            status:'Failed',
            message: err
        }); */
  }
};

exports.getresponse2 = async (req, res) => {
  try {

     //const prompt='Create 20 difficult competency based MCQ with answers and explanations and 20 difficult competency based short answer type questions with answers and explanations and 20 competency based case studies with answers on ' + module + ' with focus on ' + topic + ' and ' + keywords;
    //const prompt='Create 20 difficult competency based MCQ with answers and explanations on Timeline of History for class 6 CBSe students';
    const prompt=req.query.prompt;

    var result='Working';

    var limit1=0;



    const lcat1233=await quotanew.find()
    // .where('colid')
    //         .equals(colid1)
            .where('type')
            .equals('genai')
            .where('user')
            .equals(req.query.user);

     lcat1233.forEach(async function(data){
    //console.log(data.limit);
    limit1=parseInt(data.limit);
    //console.log('limit1 ' + limit1);
    })

    if(limit1>0) {

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o-mini",
      });
    
      //console.log(completion.choices[0].message.content);

      result=completion.choices[0].message.content;
      limit1=limit1 - 1;

      const lcat1 = await quotanew.updateMany(
      { user: req.query.user }, {
      limit: limit1
    });


    } else {
      result='Your subscription is expired. Please contact team@epaathsala.com';
    }

    

      

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: result,
      },
    });
  } catch (err) {
    /* res.status(400).json({
            status:'Failed',
            message: err
        }); */
  }
};