const { login } = require("../model/user.model");
const User = require("../model/user.model")

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10

exports.getSignupPage = (req, res, next) => {
    res.render('signup')
}

exports.postSignupInfo = (req, res, next) => {
    const { username, email, password } = req.body;
    const hassedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User(username, email, hassedPassword)
    newUser.signup()
        .then(() => {
            return res.redirect('/')
        })
        .catch((err) => {
            if(err.message.includes("userinfo_email_key")){
                res.render('error', {message: "E-mail already exists.", btnMessage: "Back to sign up", url: "signup"})
                console.log("E-mail already exists.");
            }else{
                res.render('error', {message: "Something wrong. Please try again", btnMessage: "Back to sign up", url: "signup"})
                console.error(err.message);
            }
        })
}

exports.getLoginPage = (req, res, next) => {
    res.render('login')
}

exports.postLoginInfo = (req, res, next) => {
    const { email, password } = req.body;

    login(email)
        .then((response) => {
            if (response.rows.length === 0) {
                res.render('error', {message: "Wrong login information...", btnMessage: "Back to login", url: "/"})
                console.log("E-mail doesn't exist...");
            } else {
                const userPassFromDb = response.rows[0].password
                bcrypt.compare(password, userPassFromDb, (err, result) => {

                    if(!result){
                        res.render('error', {message: "Wrong login information...", btnMessage: "Back to login", url: "/"})
                        console.log('Wrong password...');
                    }else{
                        console.log('Successfully logged in!');
                        const payload = {
                            user_id: response.rows[0].user_id,
                            username: response.rows[0].username,
                            email: response.rows[0].email,
                        }
                                                
                        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
                        res.cookie('token', token, { 
                            httpOnly: true,
                        });
                        res.redirect('/home')
                    }
                })
            }
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.checkToken = (req, res, next) => {
    try {
        const tokenStr = req.headers.cookie
        const token = tokenStr.slice(6)
        jwt.verify(token, 'secret', (err, payload) => {
            if(err){
                res.redirect("")
            }else{
                next();
            }
        })
    } catch (error) {
        res.render('error', {message: "It seems you are not authorized ...", btnMessage: "Back to login", url: ""})
    }
}

exports.postDeleteCookie = (req, res, next) => {
    res.clearCookie('token')
    res.redirect('/')
}

exports.postUpdateUsername = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    User.updateUsername(req.body.username, req.jwtPayload.user_id)
        .then(() => {
            return res.redirect('/home/mypage')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to my page", url: "home/mypage"})
        })

}

