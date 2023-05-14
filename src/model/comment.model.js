const db = require("../util/mysql");
const pool = require('../util/postgres')
const client = require('../util/neon')
module.exports = class Comment {
    constructor(comment, comment_post_id, comment_user_id, comment_date){
        this.comment_user_id = comment_user_id;
        this.comment_post_id = comment_post_id;
        this.comment = comment;
        this.comment_date = comment_date;
    }

    save(){
        const sql = `
            INSERT INTO comment (
            comment,
            comment_post_id,
            comment_user_id,
            comment_date
            ) VALUES ($1, $2, $3, $4)
        `
        const params = [
            this.comment,
            this.comment_post_id,
            this.comment_user_id,
            this.comment_date
        ]

        return client.query(sql, params)
    }

    static fetchAllComments(){
        const sql = `SELECT * FROM comment ORDER BY comment_date DESC`
        return client.query(sql)
    }
    
    static deleteComment(comment_id, comment_user_id){
        const sql = `DELETE FROM comment WHERE comment_id = $1 AND comment_user_id = $2`
        return client.query(sql, [comment_id, comment_user_id])
    }
}