const db = require("../util/mysql");
const pool = require('../util/postgres')
const client = require('../util/neon')

module.exports = class StatusPost {
    constructor(post_message, total_applied, total_onprocess, total_noresponse, total_offered, total_declined, today_applied, today_onprocess, today_noresponse, today_offered, today_declined, post_user_id, post_create_date){
        this.post_message = post_message;
        this.total_applied = total_applied;
        this.total_onprocess = total_onprocess;
        this.total_noresponse = total_noresponse;
        this.total_offered = total_offered;
        this.total_declined = total_declined;
        this.today_applied = today_applied;
        this.today_onprocess = today_onprocess;
        this.today_noresponse = today_noresponse;
        this.today_offered = today_offered;
        this.today_declined = today_declined;
        this.post_user_id = post_user_id;
        this.post_create_date = post_create_date;
    }

    save(){
        const sql = `
            INSERT INTO sharestatus (
                post_message,
                total_applied,
                total_onprocess,
                total_noresponse,
                total_offered,
                total_declined,
                today_applied,
                today_onprocess,
                today_noresponse,
                today_offered,
                today_declined,
                post_user_id,
                post_create_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `

        const params = [
            this.post_message,
            this.total_applied,
            this.total_onprocess,
            this.total_noresponse,
            this.total_offered,
            this.total_declined,
            this.today_applied,
            this.today_onprocess,
            this.today_noresponse,
            this.today_offered,
            this.today_declined,
            this.post_user_id,
            this.post_create_date,
        ]

        return client.query(sql, params)
    }

    static fetchAllSharePost(){
        const sql = `SELECT * FROM sharestatus INNER JOIN userInfo ON sharestatus.post_user_id = user_id ORDER BY post_create_date DESC`
        return client.query(sql)
    }

    static fetchSharePostById(id){
        const sql = `SELECT * FROM sharestatus where post_id = $1`
        return client.query(sql, [id])
    }

    static updateSharePost(data){
        const sql = `
            UPDATE sharestatus SET 
                post_message = $1,
                total_applied = $2,
                total_onprocess = $3,
                total_noresponse = $4,
                total_offered = $5,
                total_declined = $6,
                today_applied = $7,
                today_onprocess = $8,
                today_noresponse = $9,
                today_offered = $10,
                today_declined = $11,
                post_user_id = $12
            WHERE (post_id = $13 AND post_user_id = $14)
        `
        const params = [
            data.post_message,
            data.total_applied,
            data.total_onprocess,
            data.total_noresponse,
            data.total_offered,
            data.total_declined,
            data.today_applied,
            data.today_onprocess,
            data.today_noresponse,
            data.today_offered,
            data.today_declined,
            data.post_user_id,
            data.post_id,
            data.post_user_id,
        ]
        return client.query(sql, params)
    }

    static deleteSharePost(post_id, post_user_id){
        const sql = `DELETE FROM sharestatus WHERE post_id = $1 AND post_user_id = $2`
        return client.query(sql, [post_id, post_user_id])
    }
    
}
// module.exports = class StatusPost {
//     constructor(post_message, total_applied, total_onprocess, total_noresponse, total_offered, total_declined, today_applied, today_onprocess, today_noresponse, today_offered, today_declined, post_user_id, post_create_date){
//         this.post_message = post_message;
//         this.total_applied = total_applied;
//         this.total_onprocess = total_onprocess;
//         this.total_noresponse = total_noresponse;
//         this.total_offered = total_offered;
//         this.total_declined = total_declined;
//         this.today_applied = today_applied;
//         this.today_onprocess = today_onprocess;
//         this.today_noresponse = today_noresponse;
//         this.today_offered = today_offered;
//         this.today_declined = today_declined;
//         this.post_user_id = post_user_id;
//         this.post_create_date = post_create_date;
//     }

//     save(){
//         const sql = `
//             INSERT INTO shareStatus (
//                 post_message,
//                 total_applied,
//                 total_onprocess,
//                 total_noresponse,
//                 total_offered,
//                 total_declined,
//                 today_applied,
//                 today_onprocess,
//                 today_noresponse,
//                 today_offered,
//                 today_declined,
//                 post_user_id,
//                 post_create_date
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `

//         const params = [
//             this.post_message,
//             this.total_applied,
//             this.total_onprocess,
//             this.total_noresponse,
//             this.total_offered,
//             this.total_declined,
//             this.today_applied,
//             this.today_onprocess,
//             this.today_noresponse,
//             this.today_offered,
//             this.today_declined,
//             this.post_user_id,
//             this.post_create_date,
//         ]

//         return db.execute(sql, params)
//     }

//     static fetchAllSharePost(){
//         const sql = `SELECT * FROM shareStatus INNER JOIN userInfo ON shareStatus.post_user_id = user_id ORDER BY post_create_date DESC`
//         return db.query(sql)
//     }

//     static fetchSharePostById(id){
//         const sql = `SELECT * FROM shareStatus where post_id = ?`
//         return db.execute(sql, [id])
//     }

//     static updateSharePost(data, post_id, post_create_date){
//         const sql = `
//             UPDATE shareStatus SET 
//                 post_message = ?,
//                 total_applied = ?,
//                 total_onprocess = ?,
//                 total_noresponse = ?,
//                 total_offered = ?,
//                 total_declined = ?,
//                 today_applied = ?,
//                 today_onprocess = ?,
//                 today_noresponse = ?,
//                 today_offered = ?,
//                 today_declined = ?,
//                 post_user_id = ?
//             WHERE (post_id = ? AND post_user_id = ?)
//         `
//         const params = [
//             data.post_message,
//             data.total_applied,
//             data.total_onprocess,
//             data.total_noresponse,
//             data.total_offered,
//             data.total_declined,
//             data.today_applied,
//             data.today_onprocess,
//             data.today_noresponse,
//             data.today_offered,
//             data.today_declined,
//             data.post_user_id,
//             data.post_id,
//             data.post_user_id,
//         ]
//         return db.execute(sql, params)
//     }

//     static deleteSharePost(post_id, post_user_id){
//         const sql = `DELETE FROM shareStatus WHERE post_id = ? AND post_user_id = ?`
//         return db.execute(sql, [post_id, post_user_id])
//     }
    
// }