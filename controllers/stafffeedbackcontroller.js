const Pub=require('./../Models/user');
const Link=require('./../Models/uploadlink');
const Pub1=require('./../Models/stafffeedback');
const fs = require('fs');
const excel = require('exceljs');
const tempfile = require('tempfile');


exports.getaddstafffeedback= async (req,res) => {
    //res.cookie("user","Akshata");
    const user1=req.cookies['user'];
    var name="";
    res.status(200).render('addstafffeedback', {
        title: 'Staff Feedback',
        colid: req.params.id
    });
    
    
};

exports.createstafffeedback= async (req,res) => {

    try{
        const user1=req.cookies['user'];
        const colid=req.cookies['colid'];
        const name=req.cookies['name'];
        const today = new Date();
        const pub1= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Shares relevant and pertinent information with appropriate individuals ensuring that the Institution s’ mission is supported.",
            score: req.body.one,
            feedbackdate:today
            
        });
        const pub2= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Communicates in a manner that is in keeping with professionalism and appropriate for members of the Institution.",
            score: req.body.two,
            feedbackdate:today
        });
        const pub3= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Listens to determine the most effective way to address stakeholder’s needs and concerns. Asks questions and briefs what the speaker is saying to confirm understanding and avoid miscommunications.",
            score: req.body.three,
            feedbackdate:today
        });
        const pub4= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Clearly and accurately conveys relevant and factual information to inform the stakeholders effectively.",
            score: req.body.four,
            feedbackdate:today
        });
        const pub5= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Adapts to the needs of audiences to ensure messages are understood.",
            score: req.body.five,
            feedbackdate:today
        });
        const pub6= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Shares knowledge and resources to reach common goals. Provides feedback and healthy dialogue on performance and operational issues, as requested. Willingly adapts to change and adheres to decided actions.",
            score: req.body.six,
            feedbackdate:today
        });
        const pub7= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Communicates and engages directly, clearly, and tactfully with colleagues and demonstrates respect for diversity and differing points of view among colleagues.",
            score: req.body.seven,
            feedbackdate:today
        });
        const pub8= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Provides feedback and healthy dialogue on performance and operational issues, as requested. Willingly adapts to change and adheres to decided actions.",
            score: req.body.eight,
            feedbackdate:today
        });
        const pub9= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Works willingly with others to accomplish goals. Engages with and considers the views of others when analyzing a situation or developing a solution to achieve team goals. Provides knowledge and resources to achieve common goals.",
            score: req.body.nine,
            feedbackdate:today
        });
        const pub10= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Takes ownership of their contribution to the team’s overall success and understands how successful execution of their responsibilities contributes to public expectations for quality, service, and professionalism.",
            score: req.body.ten,
            feedbackdate:today
        });
        const pub11= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Maintains a professional and respectful tone and exhibits diplomacy when dealing with sensitive or confrontational situations.",
            score: req.body.eleven,
            feedbackdate:today
        });
        const pub12= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Behavior, gestures, and speech present a positive image of the Institution to customers.",
            score: req.body.twelve,
            feedbackdate:today
        });
        const pub13= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Chooses ethical action, even under pressure, avoids situations that are inappropriate or present a conflict of interest, and holds self/others accountable for ethical decisions.",
            score: req.body.thirteen,
            feedbackdate:today
        });
        const pub14= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Is authentic, takes action consistent with stated intentions, and provides truthful explanations for actions",
            score: req.body.fourteen,
            feedbackdate:today
        });
        const pub15= await Pub1.create({
            name: name,
            user: user1,
            colid: colid,
            type: 'Staff',
            fsname: req.body.fsname,
            email: req.body.email,
            regno: req.body.regno,
            department: req.body.department,
            question: "Takes responsibility for decisions without placing blame on others.",
            score: req.body.fifteen,
            feedbackdate:today
        });
        
        //res.status(200).send('Hello world for all the tours through db new router');
    //    res.status(201).json({
    //        status:'Success',
    //        data: {
    //            Category: lcat1
    //        }
    //    });
       //req.flash("success", "Category has been added successfully");
       req.flash("success", "Feedback has been added successfully for user " + req.cookies['user']);
    //    res.status(200).render('addpub', {
    //     title: 'Add publication'
    // });
    res.redirect('/addstafffeedback/' + req.params.id);

          
    } catch(err) {
        req.flash("error", "Feedback could not be added successfully. Error " + err );
        res.redirect('/addstafffeedback/' + req.params.id);
    }   
};


