const db = require("../util/mysql");
const pool = require('../util/postgres')
const client = require('../util/neon')

module.exports = class List {
    constructor(status, company_name, location=null, company_email, company_phone=null, company_website=null, date_applied, job_type, position, next=null, notes=null, list_user_id, favorite=false){
        this.company_name = company_name;
        this.location = location;
        this.company_email = company_email;
        this.company_phone = company_phone;
        this.company_website = company_website;
        this.position = position;
        this.job_type = job_type;
        this.status = status;
        this.date_applied = date_applied;
        this.notes = notes;
        this.next = next;
        this.list_user_id = list_user_id;
        this.favorite = favorite;
    }

    save(){
        const sql = `
            INSERT INTO companylist (
            company_name,
            location,
            company_email,
            company_phone,
            company_website,
            position,
            job_type,
            status,
            date_applied,
            notes,
            next,
            favorite,
            list_user_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `

        const params = [
            this.company_name,
            this.location,
            this.company_email,
            this.company_phone,
            this.company_website,
            this.position,
            this.job_type,
            this.status,
            this.date_applied,
            {"notes": this.notes},
            {"next": this.next},
            this.favorite,
            this.list_user_id
        ]

        return client.query(sql, params)
    }

    static fetchList = (id) => {
        const sql = `SELECT * FROM companylist WHERE list_user_id = $1 order by created_at`
        return client.query(sql, [id])
    }

    static getDetailById = (list_id, list_user_id) => {
        const sql = `SELECT * FROM companylist WHERE list_id = $1 AND list_user_id = $2`
        return client.query(sql, [list_id, list_user_id])
    }
    
    static getUserAllListById = (user_id) => {
        const sql = `SELECT * FROM companylist WHERE list_user_id = $1`
        return client.query(sql, [user_id])
    }

    static updateList = (data, id) => {
        const sql = `
            UPDATE companylist SET 
            status = $1,
            company_name = $2,
            location = $3,
            company_email = $4,
            company_phone = $5,
            company_website = $6,
            date_applied = $7,
            job_type = $8,
            position = $9,
            next = $10,
            notes = $11
            WHERE (list_id = $12 AND list_user_id = $13)
        `
        const params = [
            data.status,
            data.companyName,
            data.location,
            data.companyEmail,
            data.companyPhone,
            data.companyWebsite,
            data.dateApplied,
            data.jobType,
            data.position,
            {next: data.next},
            {notes: data.notes},
            id,
            data.list_user_id
        ]
        return client.query(sql, params)
    }

    static updateFavorite = (data, list_id, list_user_id) => {
        const sql = `UPDATE companylist SET favorite = $1 WHERE list_id = $2 AND list_user_id = $3`
        const params = [data, list_id, list_user_id]
        return client.query(sql, params)
    }

    static deleteList = (list_id, list_user_id) => {
        const sql = `DELETE FROM companylist WHERE list_id = $1 AND list_user_id = $2`
        return client.query(sql, [list_id, list_user_id])
    }

    static getUserInfoAndList = (user_id) => {
        console.log(user_id);
        const sql = `SELECT * FROM companylist WHERE list_user_id = $1`
        // const sql = `SELECT * FROM companylist INNER JOIN userInfo ON companylist.list_user_id = $1`
        return client.query(sql, [user_id])
    }
   
}
// module.exports = class List {
//     constructor(status, company_name, location=null, company_email, company_phone=null, company_website=null, date_applied, job_type, position, next=null, notes=null, list_user_id, favorite=false){
//         this.company_name = company_name;
//         this.location = location;
//         this.company_email = company_email;
//         this.company_phone = company_phone;
//         this.company_website = company_website;
//         this.position = position;
//         this.job_type = job_type;
//         this.status = status;
//         this.date_applied = date_applied;
//         this.notes = notes;
//         this.next = next;
//         this.list_user_id = list_user_id;
//         this.favorite = favorite;
//     }

//     save(){
//         const sql = `
//             INSERT INTO companyList (
//             company_name,
//             location,
//             company_email,
//             company_phone,
//             company_website,
//             position,
//             job_type,
//             status,
//             date_applied,
//             notes,
//             next,
//             favorite,
//             list_user_id
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `

//         const params = [
//             this.company_name,
//             this.location,
//             this.company_email,
//             this.company_phone,
//             this.company_website,
//             this.position,
//             this.job_type,
//             this.status,
//             this.date_applied,
//             {"notes": this.notes},
//             {"next": this.next},
//             this.favorite,
//             this.list_user_id
//         ]

//         return db.execute(sql, params)
//     }

//     static fetchList = (id) => {
//         const sql = `SELECT * FROM companyList WHERE list_user_id = ?`
//         return db.execute(sql, [id])
//     }

//     static getDetailById = (list_id, list_user_id) => {
//         const sql = `SELECT * FROM companyList WHERE list_id = ? AND list_user_id = ?`
//         return db.execute(sql, [list_id, list_user_id])
//     }
    
//     static getUserAllListById = (user_id) => {
//         const sql = `SELECT * FROM companyList WHERE list_user_id = ?`
//         return db.execute(sql, [user_id])
//     }

//     static updateList = (data, id) => {
//         const sql = `
//             UPDATE companyList SET 
//             status = ?,
//             company_name = ?, 
//             location = ?, 
//             company_email = ?,
//             company_phone = ?,
//             company_website = ?,
//             date_applied = ?,
//             job_type = ?,
//             position = ?,
//             next = ?,
//             notes = ?
//             WHERE (list_id = ? AND list_user_id = ?)
//         `
//         const params = [
//             data.status,
//             data.companyName,
//             data.location,
//             data.companyEmail,
//             data.companyPhone,
//             data.companyWebsite,
//             data.dateApplied,
//             data.jobType,
//             data.position,
//             {next: data.next},
//             {notes: data.notes},
//             id,
//             data.list_user_id
//         ]
        
//         return db.execute(sql, params)
//     }

//     static updateFavorite = (data, list_id, list_user_id) => {
//         const sql = `UPDATE companyList SET favorite = ? WHERE list_id = ? AND list_user_id = ?`
//         const params = [data, +list_id, +list_user_id]
//         return db.execute(sql, params)
//     }

//     static deleteList = (list_id, list_user_id) => {
//         const sql = `DELETE FROM companyList WHERE list_id = ? AND list_user_id = ?`
//         return db.execute(sql, [list_id, list_user_id])
//     }

//     static getUserInfoAndList = (user_id) => {
//         const sql = `SELECT * FROM companyList INNER JOIN userInfo ON companyList.list_user_id = user_id`
//         return db.execute(sql, [user_id])
//     }
   
// }
