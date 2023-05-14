const db = require("../util/mysql");
const pool = require('../util/postgres')
const client = require('../util/neon')

module.exports = class LikePost {
    constructor(like_post_id, like_user_id){
        this.like_post_id = like_post_id;
        this.like_user_id = like_user_id;        
    }

    save(){
        const sql = `
            INSERT INTO likepost (
            likePost_post_id,
            likePost_user_id
            ) VALUES ($1, $2)
        `
        const params = [
            this.like_post_id,
            this.like_user_id
        ]

        return client.query(sql, params)
    }

    static fetchAllLikePosts(){
        const sql = `SELECT * FROM likepost`
        return client.query(sql)
    }

    static deleteData(likePost_id, like_user_id){
        const sql = `DELETE FROM likepost WHERE likePost_post_id = $1 AND likePost_user_id = $2`
        return client.query(sql, [likePost_id, like_user_id])
    }

}
// module.exports = class LikePost {
//     constructor(like_post_id, like_user_id){
//         this.like_post_id = like_post_id;
//         this.like_user_id = like_user_id;        
//     }

//     save(){
//         const sql = `
//             INSERT INTO likePost (
//             likePost_post_id,
//             likePost_user_id
//             ) VALUES (?, ?)
//         `
//         const params = [
//             this.like_post_id,
//             this.like_user_id
//         ]

//         return db.execute(sql, params)
//     }

//     static fetchAllLikePosts(){
//         const sql = `SELECT * FROM likePost`
//         return db.query(sql)
//     }

//     static deleteData(likePost_id, like_user_id){
//         const sql = `DELETE FROM likePost WHERE likePost_post_id = ? AND likePost_user_id = ?`
//         return db.execute(sql, [+likePost_id, like_user_id])
//     }

// }