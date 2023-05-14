const db = require("../util/mysql");
const pool = require('../util/postgres')
const client = require('../util/neon')
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    signup(){
        const sql = `INSERT INTO userinfo (username,  email, password) VALUES ($1, $2, $3)`
        const values = [this.username, this.email, this.password]

        return client.query(sql, values)
    }
    
    static login(email){
        const sql = `SELECT * FROM userinfo WHERE email = $1`
        return client.query(sql, [email])        
    }

    static updateUsername(data, user_id){
        const sql = `UPDATE userinfo SET username = $1 WHERE user_id = $2`
        const params = [data, user_id]
        return client.query(sql, params)
    }

    static fetchAllUserInfo(){
        const sql = `SELECT * FROM userinfo`
        return client.query(sql)
    }

    static fetchUsername = (id) => {
        const sql = `SELECT username FROM userinfo WHERE user_id = $1`
        return client.query(sql, [id])
    }
}
// module.exports = class User {
//     constructor(username, email, password){
//         this.username = username;
//         this.email = email;
//         this.password = password;
//     }
    
//     signup(){
//         const sql = `INSERT INTO userInfo (username,  email, password) VALUES (?, ?, ?)`
//         const values = [this.username, this.email, this.password]

//         return db.execute(sql, values)
//     }
    
//     static login(email){
//         const sql = `SELECT * FROM userInfo WHERE email = ?`
//         return db.execute(sql, [email])
//     }

//     static updateUsername(data, user_id){
//         const sql = `UPDATE userInfo SET username = ? WHERE user_id = ?`
//         const params = [data, user_id]
//         return db.execute(sql, params)
//     }

//     static fetchAllUserInfo(){
//         const sql = `SELECT * FROM userInfo`
//         return db.query(sql)
//     }

//     static fetchUsername = (id) => {
//         const sql = `SELECT username FROM userInfo WHERE user_id = ?`
//         return db.execute(sql, [id])
//     }
// }