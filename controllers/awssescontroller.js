const AWS = require('aws-sdk');
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../Models/user");

const SES_CONFIG = {
    accessKeyId: 'AKIAUAC655EBDHJUEUDZ',
    secretAccessKey: '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',
    region: 'ap-south-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

exports.sendsesemail= async (req,res) => {

    try{
      
       sendEmail(req.query.to,'Pooja');

     res.status(200).json({
        status:'Success',
        data: {
            message : 'Feedback report sent for five years.'
        }
 
    });           
   
} catch(err) {
    res.status(400).json({
        status:'Failed',
        message: err
    });

}  
};

const sendEmail = (recipientEmail, name) => {
    let params = {
      Source: 'reminder@epaathsala.com',
      Destination: {
        ToAddresses: [
            recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'Dear Sir<br />Thank you for your email. We will get back to you soon.<br />Regards,<br />Team epaathsala.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Thank you for signing up`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

const sendEmail1 = (recipientEmail, password, name) => {
    let params = {
      Source: 'reminder@epaathsala.com',
      Destination: {
        ToAddresses: [
            recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'Dear ' + name + ',<br /><br />Your username is ' + recipientEmail + ' and your password is ' + password + '<br /><br />For any queries please send an email to team@epaathsala.com.<br /><br />Regards,<br />Team epaathsala.',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Password reminder`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

exports.sendpassword= async (req,res) => {
    try{

        const email=req.query.email;
        
        User.findOne({ email: email  }, (err, role) => {
           
            if(role) {
               
                const password=String([role.password]);
                const name=String([role.name]);
                sendEmail1(email,password, name);
                return  res.status(200).json({
                    status:'Success',
                    data: {
                        message : password
                    }
             
                }); 
            } else {
                return res.status(201).json({
                    status:'Invalid username or password',
                });
            }
          });
    } catch(err) {
        // res.status(201).json({
        //     status:'Error ' + err,
        // });

    }  
};

// dec 15 2024

const sendactEmail = (recipientEmail, emaildata, name) => {
  let params = {
    Source: 'reminder@epaathsala.com',
    Destination: {
      ToAddresses: [
          recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emaildata,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Welcome to Campus Technology`,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

exports.sendwelcome= async (req,res) => {
  try{

      const email=req.query.email;
      const name=req.query.name;

      var emailbody='Dear ' + name + '<br /><br />';
      emailbody=emailbody + 'Thank you for signing up. Please click on the below link to activate your account.<br /><br />';
      emailbody=emailbody + '<a href="https://canvasapi5.azurewebsites.net/activateuser?user=' + email + '">Click here to activate</a><br /><br />';
      emailbody=emailbody + 'Your trial account is activated for 7 days. At the end of trial, you may extend by paying the subscription fees.<br /><br />.';
      emailbody=emailbody + 'Please do not hesitate to contact us at team@epaathsala.com if you have any queries.<br /><br />.';
      emailbody=emailbody + 'Best regards,<br /><br />.';
      emailbody=emailbody + 'Team epaathsala<br /><br />.';

      sendactEmail(email,emailbody, name);

      return  res.status(200).json({
        status:'Success'
 
    }); 
      
     
  } catch(err) {
      // res.status(201).json({
      //     status:'Error ' + err,
      // });

  }  
};

// dec 16 2024

const sendanyEmail = (recipientEmail, emaildata, subject) => {
  let params = {
    Source: 'reminder@epaathsala.com',
    Destination: {
      ToAddresses: [
          recipientEmail
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emaildata,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      }
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

exports.sendawsemail= async (req,res) => {
  try{

      const email=req.query.email;
      
      const emailbody=req.query.emailbody;
      const subject=req.query.subject;

      

      sendanyEmail(email,emailbody, subject);

      return  res.status(200).json({
        status:'Success'
 
    }); 
      
     
  } catch(err) {
      // res.status(201).json({
      //     status:'Error ' + err,
      // });

  }  
};