const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const dbConnection = require("../utils/dbConnection");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const store = require('store2');



exports.homePage = async (req, res, next) => {
    res.send('hello world');
}


// Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};

// User Registration
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }
    try {
        // connect to db 
        const [row] = await dbConnection.execute(
            "SELECT * FROM `users` WHERE `email`=? ;",
            [body.email]
        );
            // check have already or not
        if (row.length >= 1) {
            return res.render('register', {
                error: 'This email already in use.'
            });
        }
            //compare confirm password and password
        if (body.password!==body.confirm_password) {
            return res.render('register', {
                error: 'Password and confirm password is incorrect.'
            });
        }
        // encrypt passwrod 
        const hashPass = await bcrypt.hash(body.password, 12);
        //insert data to db
        const [rows] = await dbConnection.execute(
            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?);",
            [body.name, body.email, hashPass]
        );
        //check insert already or not
        if (rows.affectedRows !== 1) {
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        }
        //get id and main 
        
        res.render("register", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};



// // Login Page
exports.loginPage = (req, res, next) => {
    res.render("login");
};

// Login User
exports.login = async (req, res, next) => {
    
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('login', {
            error: errors.array()[0].msg
        });
    }
    try {

        const [user] = await dbConnection.execute('SELECT * FROM `users` WHERE `email`=?', [body.email]);
   
        if (user.length != 1) {
            return res.render('login', {
                error: 'Invalid email address.'
            });
        }

        const checkPass = await bcrypt.compare(body.password, user[0].password)
        if(checkPass === false){
            res.render('login', {
                error: 'Invalid Password.',
          });
        }else{

            const id =user[0].role_id;

            const token = await jwt.sign({id},process.env.SECRETE,
                { expiresIn: '2h' })
            store.set(process.env.SECRETE,token);
            res.redirect("/")     
        }
    }
    catch (e) {
        next(e);
    }

}

//change password
exports.changepasswordPage = (req, res, next) => {
    res.render("changepass");
};

exports.changepassword = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('changepass', {
            error: errors.array()[0].msg
        });
    }

    try {
        // select email that we input have or not
        const [row] = await dbConnection.execute(
            "SELECT * FROM users WHERE email=?;",
            [body._email]
        );
           // display err when cannot find
        if (row.length != 1) {
            return res.render('changepass', {
                error: 'Invalid email address.'
            });
        }
        //check old password
        const checkPass = await bcrypt.compare(body._password, row[0].password);
        if (checkPass === false) {
            return res.render('changepass', {
                error: 'Invalid email address.'
            });
        } 
        //compare new password/ confirm pass
        if (body._new_password != body._confirm_password) {
            return res.render('changepass', {
                error: 'Password and confirm password is incorrect.'
            });
        }
        // //compare password
        const hashPass = await bcrypt.hash(body._new_password, 12);
        const [rows] = await dbConnection.execute(
            "UPDATE `users` SET password=?  where email=?",[hashPass,body._email]
        );

        if (rows.affectedRows !== 1) {
            return res.render('changepass', {
                error: 'Your change password has failed.'
            });
        }
        
        res.render("changepass", {
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};