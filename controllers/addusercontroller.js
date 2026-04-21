const User = require('./../Models/user');
const jwt = require('jsonwebtoken');


exports.getallusers = (req, res) => {
    //res.cookie("user","Akshata");
    const role = req.cookies['role'];
    if (role == 'Admin') {
        res.status(200).render('addusers', {
            title: 'Add users'
        });

    } else {
        res.redirect('/notauthorized');

    }

};

exports.getallusersadmin = (req, res) => {
    //res.cookie("user","Akshata");
    res.status(200).render('addusersadmin', {
        title: 'Add users'
    });


};

exports.getunauthorized = (req, res) => {
    //res.cookie("user","Akshata");
    req.flash("error", "Not authorized !!!");
    res.status(200).render('notauthorized', {
        title: 'Not authorized'
    });
};

exports.getexportdetails = (req, res) => {
    //res.cookie("user","Akshata");
    const role = req.cookies['role'];
    if (role == 'Admin') {
        res.status(200).render('exportdetails', {
            title: 'Export all data'
        });

    } else {
        res.redirect('/notauthorized');

    }

};



exports.getlogin = (req, res) => {
    //res.cookie("user","Akshata");
    res.clearCookie("user");
    res.status(200).render('loginnew', {
        title: 'Login to the online portal'
    });
};

exports.getloginnew = (req, res) => {
    //res.cookie("user","Akshata");
    res.clearCookie("user");
    res.status(200).render('loginnew1', {
        title: 'Login to the online portal',
        college: req.query.institution
    });
};

exports.getlogincol = (req, res) => {
    //res.cookie("user","Akshata");
    //res.clearCookie("user");
    res.status(200).render('logincol2', {
        title: 'Login to the online portal'
    });
};

exports.createusers = async (req, res) => {

    try {
        const code = req.body.code;
        const user1 = req.cookies['user'];
        const colid = req.cookies['colid'];
        const regno = "NA";
        const semester = "NA";
        const section = "NA";
        const programcode = "NA";
        const admissionyear = "NA";
        if (code == "kumropatash") {
            const user1 = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                colid: colid,
                department: req.body.department,
                section: section,
                semester: semester,
                programcode: programcode,
                admissionyear: admissionyear,
                regno: regno,
                status: req.body.status
            });
            //req.flash("success", "User has been added successfully for user " + req.cookies['user']);
            req.flash("success", "User has been added successfully");
            res.status(200).render('addusers', {
                title: 'User Management'
            });

        } else {
            req.flash("error", "Invalid code");
            res.status(200).render('addusers', {
                title: 'User Management'
            });

        }

    } catch (err) {
        req.flash("error", "User could not be added successfully. Error " + err);
        //req.flash("success", "Category has been added successfully for " + req.cookie.user);
        res.status(200).render('addusers', {
            title: 'User Management'
        });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }
};

exports.createusersadmin = async (req, res) => {

    try {
        const code = req.body.code;
        //const user1=req.cookies['user'];
        //const colid=req.cookies['colid'];
        const regno = "NA";
        const semester = "NA";
        const section = "NA";
        const programcode = "NA";
        const admissionyear = "NA";
        if (code == "kumropatash") {
            const user1 = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                colid: req.body.colid,
                department: req.body.department,
                section: section,
                semester: semester,
                programcode: programcode,
                admissionyear: admissionyear,
                regno: regno,
                status: req.body.status
            });
            //req.flash("success", "User has been added successfully for user " + req.cookies['user']);
            req.flash("success", "User has been added successfully");
            res.status(200).render('addusers', {
                title: 'User Management'
            });

        } else {
            req.flash("error", "Invalid code");
            res.status(200).render('addusers', {
                title: 'User Management'
            });

        }

    } catch (err) {
        req.flash("error", "User could not be added successfully. Error " + err);
        //req.flash("success", "Category has been added successfully for " + req.cookie.user);
        res.status(200).render('addusers', {
            title: 'User Management'
        });
        // res.status(400).json({
        //     status:'Failed',
        //     message: err
        // });

    }
};


exports.postlogin2 = async (req, res) => {
    //res.cookie("user","Akshata");

    try {
        //const user1=req.cookies['user'];
        //const user123= await User.findOne({ email : req.body.email}).exec();
        const email = req.body.email;
        const password = req.body.password;
        // const user123= await User.find()
        // .where('password')
        // .equals(password)
        // .where('email')
        // .equals(email);

        User.findOne({ email: email, password: password }, (err, role) => {
            if (err) {
                req.flash("error", "An error occured " + err);
                res.status(200).render('loginnew', {
                    title: 'Login'

                });
            }

            if (role) {
                res.cookie("user", String([role.email]));
                res.cookie("name", String([role.name]));
                res.cookie("department", String([role.department]));
                res.cookie("colid", String([role.colid]));
                res.cookie("role", String([role.role]));
                res.cookie("photo", String([role.photo]));
                const token = jwt.sign({ user: email, colid: String([role.colid]) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.cookie("token", token);
                req.flash("success", "Login with userid " + [role._id] + " email " + [role.email]);
                // res.status(200).render('addcategory', {            
                //     title: 'Add category'

                // });
                if (String([role.role]) == "Student") {
                    res.cookie("regno", String([role.regno]));
                    res.cookie("section", String([role.section]));
                    res.cookie("semester", String([role.semester]));

                    res.redirect('/viewclassstud');
                } else {
                    res.redirect('/dashboard');

                }




            } else {
                req.flash("error", "Invalid email or password ");
                res.status(200).render('loginnew', {
                    title: 'Login'

                });

            }

            //user.roles = [role._id];
            // req.flash("success", "Login with userid " + [role._id] + " email " + [role.email]);
            // res.status(200).render('login1', {            
            //     title: 'Login'

            // });
        });




        //console.log(user123);
        //console.log(user123.email);
        // if(user123.email) {
        //     res.cookie("user",user123.email);
        //         res.status(200).render('addusers', {            
        //             title: 'Select'         
        //         });

        // } else {
        //     req.flash("error", "Invalid email or password for " + email);
        //     res.status(200).render('login1', {
        //     categories: user123,
        //     title: 'Login'   
        //      });

        // }

    } catch (err) {
        req.flash("error", "An error occured " + err);
        res.status(200).render('login1', {
            title: 'Login'

        });

    }
};

exports.postlogin1 = async (req, res) => {
    //res.cookie("user","Akshata");

    try {
        //const user1=req.cookies['user'];
        User.findOne({
            email: req.body.email
        }).exec((err, user123) => {
            if (err) {
                req.flash("error", "Invalid email or password");
                res.status(200).render('login', {
                    categories: user123,
                    title: 'Login'
                });
            }
            if (user123) {
                res.cookie("user", user123.email);
                res.status(200).render('addusers', {
                    categories: user123,
                    title: 'Select'
                });

            }

        });

    } catch (err) {
        req.flash("error", "An error occured " + err);
        res.status(200).render('login', {
            categories: user1233,
            title: 'Login'

        });

    }
};


exports.postlogincol = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        const department = req.cookies['department'];
        const name = req.cookies['name'];
        //console.log('Updating');
        const lcat1 = await User.updateOne({ email: user1 }, {
            colid: req.body.colid,
            email: user1
        });
        res.cookie("colid", req.body.colid);
        //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
        req.flash("success", "Institution Code has been Updated Successfully");
        res.redirect('/dashboard');
    } catch (err) {
        req.flash("error", "Institution Code is required and must be a number" + err);

        res.redirect('/logincol');

    }
};

exports.postlogincol1 = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        const department = req.cookies['department'];
        const name = req.cookies['name'];
        //console.log('Updating');
        const lcat1 = await User.updateOne({ email: user1 }, {
            colid: req.body.colid,
            semester: req.body.semester,
            password: req.body.password,
            section: req.body.section,
            regno: req.body.regno,
            role: req.body.role,
            programcode: req.body.programcode,
            admissionyear: req.body.admissionyear,
            email: user1
        });
        res.cookie("colid", req.body.colid);
        res.cookie("regno", req.body.regno);
        res.cookie("semester", req.body.semester);
        res.cookie("section", req.body.section);
        //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
        if (req.body.role == "Student") {
            req.flash("success", "Institution Code has been Updated Successfully");
            res.redirect('/viewclassstud');

        } else {
            req.flash("success", "Institution Code has been Updated Successfully");
            res.redirect('/dashboard');

        }

    } catch (err) {
        req.flash("error", "Institution Code is required and must be a number" + err);

        res.redirect('/logincol');

    }
};

exports.postlogincol2 = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        const department = req.cookies['department'];
        const name = req.cookies['name'];
        //console.log('Updating');
        const colid1 = req.body.colid.split("-");
        const colid = parseInt(colid1[0]);
        //console.log("colid " + colid);
        var sum1 = 0;
        var n1 = 0;
        var sum21 = 0;
        var sum22 = 0;
        var sum2 = 0;
        var n2 = 0;
        for (var i = 0; i < colid1[0].length; i++) {
            n1 = Number(colid1[0].charAt(i));
            var n21 = i + 6 + 1;
            if (n21 % 2 == 0) {
                sum1 = sum1 + n1 + n1;
            } else {
                sum1 = sum1 + n1 * n1;
            }

        }
        for (var i = 0; i < colid1[0].length; i++) {
            n2 = Number(colid1[0].charAt(i));
            var n22 = i + 6 + 1;
            if (n22 % 2 == 0) {
                sum22 = sum22 + n2;
            } else {
                sum21 = sum21 + n2;
            }
            sum2 = sum21 * sum21 + sum22 * sum22;

        }
        //console.log("sum1 " + sum1);
        //console.log("sum2 " + sum2);
        if (parseInt(colid1[1]) == sum1 && parseInt(colid1[2]) == sum2) {
            const lcat1 = await User.updateOne({ email: user1 }, {
                colid: colid,
                semester: req.body.semester,
                password: req.body.password,
                section: req.body.section,
                regno: req.body.regno,
                role: req.body.role,
                programcode: req.body.programcode,
                admissionyear: req.body.admissionyear,
                email: user1
            });
            res.cookie("colid", colid);
            res.cookie("regno", req.body.regno);
            res.cookie("semester", req.body.semester);
            res.cookie("section", req.body.section);
            //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
            if (req.body.role == "Student") {
                req.flash("success", "Institution Code has been Updated Successfully");
                res.redirect('/viewclassstud');

            } else {
                req.flash("success", "Institution Code has been Updated Successfully");
                res.redirect('/dashboard');

            }


        } else {
            req.flash("error", "Invalid Institution Code.");
            res.redirect('/logincol');

        }


    } catch (err) {
        req.flash("error", "Institution Code is required and must be a number" + err);

        res.redirect('/logincol');

    }
};


// exports.getallcat2= async (req,res) => {
//     res.cookie("user","Akshata");

//     try{
//         const lcat123= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//         res.status(200).render('viewcategory', {
//             categories: lcat123,
//             title: 'List Categories'

//         });

//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }  
// };

// exports.getallcat= async (req,res) => {

//     try{
//         const lcat12= await Lcat.find();
//         //res.status(200).send('Hello world for all the tours through db new router');
//        res.status(201).json({
//            status:'Success',
//            data: {
//                lcat12
//            }
//        });
//     } catch(err) {
//         res.status(400).json({
//             status:'Failed',
//             message: err
//         });

//     }   
// };

exports.getcat1 = async (req, res) => {

    try {
        const lcat23 = await Lcat.findById(req.body.id);
        //res.status(200).send('Hello world for all the tours through db new router');
        res.status(201).json({
            status: 'Success',
            data: {
                lcat23
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });

    }
};

exports.getedituser = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        if (user1) {
            const leditcat = await User.findById(req.params.id);
            res.status(200).render('edituser', {
                pub: leditcat,
                category: leditcat,
                title: 'Edit'

            });
        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });

    }
};

exports.updateuser = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        const colid = req.cookies['colid'];
        const department = req.cookies['department'];
        const name = req.cookies['name'];
        const lcat1 = await User.findByIdAndUpdate(req.params.id, {
            colid: colid,
            department: req.body.department,
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            category: req.body.category,
            quota: req.body.quota,
            programcode: req.body.programcode,
            regno: req.body.regno,
            semester: req.body.semester,
            section: req.body.section,
            admissionyear: req.body.admissionyear,
            gender: req.body.gender
        });

        //req.flash("success", "Category has been updated successfully for user " + req.cookies['user']);
        req.flash("success", "Data has been updated successfully");
        res.redirect('/viewallusers');
    } catch (err) {
        req.flash("error", "Data could not be added successfully. Error " + err);
        res.redirect('/edituser');

    }
};

exports.getviewallusers = async (req, res) => {
    try {
        const user1 = req.cookies['user'];
        const colid = req.cookies['colid'];
        const role = req.cookies['role'];
        if (user1) {
            const lcat1233 = await User.find()
                .where('colid')
                .equals(colid);
            //res.status(200).send('Hello world for all the tours through db new router');
            if (role == 'Admin') {
                res.status(200).render('viewallusers', {
                    categories: lcat1233,
                    title: 'List all users',
                    user: user1

                });

            } else {
                res.redirect('/notauthorized');

            }

        } else {
            req.flash("error", "You have been logged out. Please login to continue.");
            res.redirect('/login');

        }
    } catch (err) {
        res.status(400).json({
            status: 'Failed',
            message: err
        });

    }
};

exports.deleteuser = async (req, res) => {

    try {
        const user1 = req.cookies['user'];
        await Pub.findByIdAndDelete(req.body.category_id);

        req.flash("success", "Data has been deleted successfully");
        res.redirect('/viewallusers');
    } catch (err) {
        req.flash("error", "Data could not be deleted successfully. Error " + err);
        res.redirect('/viewallusers');
    }
};

exports.getallusersapi = async (req, res) => {
    try {
        const { colid } = req.body;
        // Fetch users matching colid. You might want to filter by role if needed.
        // Returning minimal fields for dropdown
        const users = await User.find({ colid: colid })
            .select('name email username role _id')
            .sort({ name: 1 });

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users // StoreUserAccessds expects { data: [...] } if using response.data.data
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};