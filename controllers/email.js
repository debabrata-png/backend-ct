const nodemailer=require('nodemailer');

exports.sendEmail = async (req,res) => {
    const transporter=nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'support@campus.technology',
            pass: 'Hello@1234'
            
        }
    });
    const mailoptions= {
        from: 'Support<support@campus.technology',
        to: 'suman@campus.technology',
        cc: 'nandy2k2@gmail.com,pooja.vasudev@epaathsala.com',
        subject: 'Please submit accreditation data by Oct 15',
        text: 'Dear sir, kindly submit all accreditation data by Oct 15'

    }
    await transporter.sendMail(mailoptions);
    res.status(200).json({
        status:'Success'  
    }); 
}