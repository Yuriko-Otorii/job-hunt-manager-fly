const List = require("../model/list.model")
const StatusPost = require("../model/statusPost.model");

const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.getCompanyListPage = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.fetchList(req.jwtPayload.user_id)
        .then(data => {
            res.render('processList', { list: data.rows})
        })
        .catch(err => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getDetailPage = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.getDetailById(req.params.listId, req.jwtPayload.user_id)
        .then(data => {
            res.render("detail", {detailInfo: data.rows[0]})
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getEditPage = (req,res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.getDetailById(req.params.listId, req.jwtPayload.user_id)
        .then(data => {
            res.render("edit", {detailInfo: data.rows[0]})
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.getNewListPage = (req, res, next) => {
    res.render('addNewList')
}

exports.postNewList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)

    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    let listObj = req.body;
    listObj.list_user_id = req.jwtPayload.user_id

    if(!Array.isArray(listObj.next)){
        listObj.next = [listObj.next]
    }
    if(listObj.next[0] === undefined){
        listObj.next[0] = ""
    }
    
    if(!Array.isArray(listObj.notes)){
        listObj.notes = [listObj.notes]
    }
    if(listObj.notes[0] === undefined){
        listObj.notes[0] = ""
    }

    const newList = new List(...Object.values(listObj))
    newList.save()
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.updateList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)

    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;
    let updatedObj = req.body;
    updatedObj.list_user_id = req.jwtPayload.user_id

    if(!Array.isArray(updatedObj.next)){
        updatedObj.next = [updatedObj.next]
    }
    if(updatedObj.next[0] === undefined){
        updatedObj.next[0] = ""
    }
    
    if(!Array.isArray(updatedObj.notes)){
        updatedObj.notes = [updatedObj.notes]
    }
    if(updatedObj.notes[0] === undefined){
        updatedObj.notes[0] = ""
    }


    List.updateList(updatedObj, req.params.listId)
        .then(() => {
            res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.deleteList = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    List.deleteList(req.params.listId, req.jwtPayload.user_id)
        .then(() => {
            return res.redirect('/home')
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })   
}

exports.updateFavorite = (req, res, next) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const { favorite, list_id } = req.body
    if(favorite === "false"){
        List.updateFavorite(true, list_id, req.jwtPayload.user_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => console.error(err.message))
    }else{
        List.updateFavorite(false, list_id, req.jwtPayload.user_id)
            .then(() => {
                return res.redirect('/home')
            })
            .catch((err) => {
                console.error(err.message)
                res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
            })
    }
}

exports.getMyPage = (req, res, next) => {
    getUserAllList("myPage", "Back to home", "home", req, res) 
}


exports.getCreatePostPage = (req, res, next) => {
    getUserAllList("postStatus", "Back to my page", "/home/mypage", req, res) 
}

exports.getEditShareStatusPage = (req, res, next) => {
    getUserAllList("editStatus", "Back to share page", "/sharepage", req, res) 

}


const getUserAllList = (page, message, url, req, res) => {
    const tokenStr = req.headers.cookie
    const token = tokenStr.slice(6)
    const decoded = jwt.verify(token, "secret");
    req.jwtPayload = decoded;

    const { user_id: userId } = req.jwtPayload
    User.fetchUsername(userId)
        .then(data => {
            const username = data.rows[0].username
            const totalData = {
                apply: [],
                onProcess:  [],
                noResponse: [],
                offered: [],
                declined: []
            }
            const todayData = {
                apply: [],
                onProcess:  [],
                noResponse: [],
                offered: [],
                declined: []
            }
        
            List.getUserInfoAndList(req.jwtPayload.user_id)
                .then(data => {
                    // console.log(data);
                    const userDatalist = data.rows
                    .filter((item) => item.list_user_id === req.jwtPayload.user_id)
                    if(userDatalist[0]){
                        const today = new Date()
                        let statusPostObj;
                        userDatalist.forEach(elem => {
                            const dateApplied = new Date(elem.date_applied)
                            totalData.apply.push(elem.date_applied)
                            //Check total number
                            if(elem.status === "onProcess"){
                                totalData.onProcess.push(dateApplied)
                            }else if(elem.status === "noResponse"){
                                totalData.noResponse.push(dateApplied)
                            
                            }else if(elem.status === "offered"){
                                totalData.offered.push(dateApplied)
                            
                            }else if(elem.status === "declined"){
                                totalData.declined.push(dateApplied)
                            }
            
                            //Check today's number
                            if(today.getDate() === dateApplied.getDate()){
                                todayData.apply.push(dateApplied)
                                if(elem.status === "onProcess"){
                                    todayData.onProcess.push(dateApplied)
                                }else if(elem.status === "noResponse"){
                                    todayData.noResponse.push(dateApplied)
                                
                                }else if(elem.status === "offered"){
                                    todayData.offered.push(dateApplied)
                                
                                }else if(elem.status === "declined"){
                                    todayData.declined.push(dateApplied)
                                }
                            }
                        });
            
                        
                        
                        StatusPost.fetchSharePostById(req.params.postId)
                            .then(([statusPostData]) => {
                                statusPostObj = statusPostData
                                
                            })
                            .catch((err) => {
                                console.error(err.message)
                                res.render('error', {message: "Something wrong in server.", btnMessage: message, url: url})
                            });
                            
                        return res.render(page, {username, todayData, totalData, postId: req.params.postId, statusPostObj})
                    }else{
                        return res.render(page, {username, todayData, totalData, postId: req.params.postId})
                    }
                })
            .catch((err) => {
                console.error(err.message)
                res.render('error', {message: "Something wrong in server.", btnMessage: message, url: url})
            })  

        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })

}