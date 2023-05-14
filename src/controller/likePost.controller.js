const LikePost = require("../model/likePost.model")

const jwt = require("jsonwebtoken");

exports.handleLikeAction = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const reqObj = req.body

    if(reqObj.likeStatus === "true"){
        //Delete data from likePost table
        LikePost.deleteData(reqObj.post_id, req.jwtPayload.user_id)
            .then(() => {
                return res.redirect('/sharepage')
            })
            .catch((err) => {
                console.error(err.message)
                res.render('error', {message: "Something wrong in server.", btnMessage: "Back to share page", url: "/sharepage"})
            })
    }else{
        //Insert New data into likePost table
        const newLikeObj = new LikePost(reqObj.post_id, req.jwtPayload.user_id)
        newLikeObj.save()
            .then(() => {
                return res.redirect('/sharepage')
            })
            .catch((err) => {
                console.error(err.message)
                res.render('error', {message: "Something wrong in server.", btnMessage: "Back to share page", url: "/sharepage"})
            })
    }

}

