const Emp=require('./../Models/empmodel');


exports.getalltours=(req,res) => {
    res.status(200).send('Hello world for all the tours through db new router');
   
};

exports.gettour = (req,res) => {
    console.log(req.params);
    res.status(200).send('Hello world for the new get param tours through db new router');

};

exports.createemp= async (req,res) => {

    try{
        const emp1= await Emp.create(req.body);

        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               employee: emp1
           }
    
       });

    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }
   
};

exports.getalltours1= async (req,res) => {

    try{
        const emp1= await Emp.create({
            name: 'Employee 12',
            email: 'nandy2k2@hotmail.com',
            phone: '7406168822',
            age:40
        });
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               employee: emp1
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.getalltours2= async (req,res) => {

    try{
        const emp1= await Emp.find();
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               emp1
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.getalltours3= async (req,res) => {

    try{
        const emp1= await Emp.find();
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           emp1
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};

exports.gettour1= async (req,res) => {

    try{
        const emp1= await Emp.findById(req.params.id);
        //res.status(200).send('Hello world for all the tours through db new router');
       res.status(201).json({
           status:'Success',
           data: {
               emp1
           }
       });
    } catch(err) {
        res.status(400).json({
            status:'Failed',
            message: err
        });

    }   
};