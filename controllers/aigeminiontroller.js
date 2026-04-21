const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/user");
const mcoursematerial = require("./../Models/mcoursematerial");
const massignments = require("./../Models/massignments");

// import { GoogleGenAI } from "@google/genai";

const { GoogleGenAI, Type } = require('@google/genai');


exports.testgemini = async (req, res) => {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question
  });
  //console.log(response.text);

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: response.text,
      },
    });
  try {
    
  } catch (err) {
    res.status(400).json({
            status:'Failed',
            message: err
        });
  }
};


exports.testgemini1 = async (req, res) => {
    var response1='';
    var status1='Success';
   // console.log('API Key ' + req.query.apikey + ' Question ' + req.query.question);
  try {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            // recipeName: {
            //   type: Type.STRING,
            // },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["ingredients"],
        },
      },
    },
  });
  //console.log(response.text);

  response1=response.text;

    //console.log(lcat1233);
    
    
  } catch (err) {
    response1='Failed ' + err;
    status1='Failed';
    // res.status(400).json({
    //         status:'Failed',
    //         message: err
    //     });
  }
  return res.status(200).json({
      status: status1,
      data: {
        classes: response1,
      },
    });
};

exports.testgemini2 = async (req, res) => {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            // recipeName: {
            //   type: Type.STRING,
            // },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["ingredients"],
        },
      },
    },
  });
  console.log(response.text);
  const parsedData = JSON.parse(response.text); // Parse the JSON string
    //console.log("Parsed JSON data:", parsedData);
    // Print each module and its ingredients
    const coursename=req.query.coursename
parsedData.forEach((module, index) => {
  //console.log(`\n=== Module ${index + 1} ===`);
  var topic1='';
  module.ingredients.forEach((topic, i) => {
    topic1=topic1+topic+' ';
    //console.log(`${i + 1}. ${topic}`);
  });
  console.log(`\n=== Module ${index + 1} === ${topic1} in ${coursename}`);
  //console.log('Module ' + topic1);
});
    // Loop through and print each module
// parsedData.forEach((item, index) => {
//   console.log(`Module ${index + 1}: ${item.ingredients[0]}`);
// });
//   response.text.ingredients.forEach(async function(data){
//     console.log(data);

    
//     })

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: response.text,
      },
    });
  try {
    
  } catch (err) {
    res.status(400).json({
            status:'Failed',
            message: err
        });
  }
};

exports.geminimodules = async (req, res) => {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            // recipeName: {
            //   type: Type.STRING,
            // },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["ingredients"],
        },
      },
    },
  });
  //console.log(response.text);
  const parsedData = JSON.parse(response.text); // Parse the JSON string
    //console.log("Parsed JSON data:", parsedData);
    // Print each module and its ingredients
    const coursename=req.query.course;
parsedData.forEach(async (module, index) => {
  //console.log(`\n=== Module ${index + 1} ===`);
  var topic1='';
  module.ingredients.forEach((topic, i) => {
    topic1=topic1+topic+' ';
    //console.log(`${i + 1}. ${topic}`);
  });
  //console.log(`\n=== Module ${index + 1} === ${topic1} in ${coursename}`);
  const pub1 = await mcoursematerial.create({
      name: req.query.name,
      colid: req.query.colid,
      user: req.query.user,
      year: req.query.year,
      course: req.query.course,
      coursecode: req.query.coursecode,
      slideno: index + 1,
      title: topic1 + ' in ' + coursename,
      description: topic1 + ' in ' + coursename,
      imagelink: 'NA',
      voicetext: topic1 + ' in ' + coursename,
      doclink: 'NA',
      type: 'Theory',
      mode: 'Online',
      status1: "Submitted",
      comments: "NA",
    });
  //console.log('Module ' + topic1);
});
    // Loop through and print each module
// parsedData.forEach((item, index) => {
//   console.log(`Module ${index + 1}: ${item.ingredients[0]}`);
// });
//   response.text.ingredients.forEach(async function(data){
//     console.log(data);

    
//     })

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: response.text,
      },
    });
  try {
    
  } catch (err) {
    res.status(400).json({
            status:'Failed',
            message: err
        });
  }
};


exports.geminimodules1 = async (req, res) => {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            // recipeName: {
            //   type: Type.STRING,
            // },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["ingredients"],
        },
      },
    },
  });
  //console.log(response.text);
  const parsedData = JSON.parse(response.text); // Parse the JSON string
    //console.log("Parsed JSON data:", parsedData);
    // Print each module and its ingredients
    const coursename=req.query.course;
parsedData.forEach(async (module, index) => {
  //console.log(`\n=== Module ${index + 1} ===`);
  var topic1='';
  module.ingredients.forEach(async(topic, i) => {
    topic1=topic1+topic+' ';
    const pub1 = await mcoursematerial.create({
      name: req.query.name,
      colid: req.query.colid,
      user: req.query.user,
      year: req.query.year,
      course: req.query.course,
      coursecode: req.query.coursecode,
      slideno: index + 1,
      title: topic + ' in ' + coursename,
      description: topic + ' in ' + coursename,
      imagelink: 'NA',
      voicetext: topic + ' in ' + coursename,
      doclink: 'NA',
      type: 'Theory',
      mode: 'Online',
      status1: "Submitted",
      comments: "NA",
    });
    //console.log(`${i + 1}. ${topic}`);
  });
  //console.log(`\n=== Module ${index + 1} === ${topic1} in ${coursename}`);
  
  //console.log('Module ' + topic1);
});
   

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: response.text,
      },
    });
  try {
    
  } catch (err) {
    res.status(400).json({
            status:'Failed',
            message: err
        });
  }
};

exports.testgemini3 = async (req, res) => {
    const ai = new GoogleGenAI({apiKey: req.query.apikey});
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: req.query.question,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipe: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            
          },
          propertyOrdering: ["recipe","ingredients"],
        },
      },
    },
  });
  //console.log(response.text);
  const parsedData = JSON.parse(response.text); // Parse the JSON string
    //console.log("Parsed JSON data:", parsedData);
    // Print each module and its ingredients
    //const coursename=req.query.coursename

    // Loop through and print each module
parsedData.forEach(async(item, index) => {
  
 
  var topic1='';
  item.ingredients.forEach((topic, i) => {
    topic1=topic1+topic+' ';
    //console.log(`${i + 1}. ${topic}`);
  });

  //console.log(`Module ${index + 1}: ${item.recipe} - ${topic1}`);
  var someDate = new Date();
var numberOfDaysToAdd = 6;
var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const pub1 = await massignments.create({
    name: req.query.name,
    colid: req.query.colid,
    user: req.query.user,
    year: req.query.year,
    course: req.query.course,
    coursecode: req.query.coursecode,
    assignment: item.recipe,
    description: topic1,
    duedate: someDate,
    type: 'Homework',
    methodology: 'Self-study',
    learning: 'Advanced',
    doclink: 'NA',
    status1: "Submitted",
    comments: "NA",
  });




});
 

    //console.log(lcat1233);
    return res.status(200).json({
      status: "Success",
      data: {
        classes: response.text,
      },
    });
  try {
    
  } catch (err) {
    res.status(400).json({
            status:'Failed',
            message: err
        });
  }
};