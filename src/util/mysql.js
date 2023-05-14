// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASS,
//     database: process.env.MYSQL_DBNAME,
//     port: process.env.MYSQL_PORT
// })


// const userInfoTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='userInfo'`;
// pool.query(userInfoTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'userInfo' does not exist");
//     createUserInfoTable();
//   } else {
//     console.log("Table 'userInfo' exists");
//     // createUserInfoTable()
//   }
// });

// const createUserInfoTable = () => {
//     pool.query(`DROP TABLE IF EXISTS userInfo`);  

//     pool.query(
//       `CREATE TABLE userInfo(
//           user_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
//           username VARCHAR(50) NOT NULL UNIQUE,
//           email VARCHAR(50) NOT NULL UNIQUE,
//           password VARCHAR(100) NOT NULL
//       ) ENGINE=InnoDB;`,

//       (err) => {
//           if (err) {
//               return console.error(err.message);
//           }
//           console.log("Successfully created the 'userInfo' table");
//       }
//     ); 
// }


// const companyListTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='companyList'`;
// pool.query(companyListTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'companyList' does not exist");
//     // createCompanyListTable()
//   } else {
//     console.log("Table 'companyList' exists");
//     // createCompanyListTable()
//   }
// });

// const createCompanyListTable = () => {
//   pool.query(`DROP TABLE IF EXISTS companyList`);  

//   pool.query(
//     `CREATE TABLE companyList(
//       list_id INT PRIMARY KEY AUTO_INCREMENT,
//       list_user_id INT NOT NULL,
//       company_name VARCHAR(50) NOT NULL,
//       location VARCHAR(50),
//       company_email VARCHAR(50),
//       company_phone VARCHAR(50),
//       company_website VARCHAR(100),
//       position VARCHAR(50) NOT NULL,
//       job_type VARCHAR(50) NOT NULL,
//       status VARCHAR(50) NOT NULL,
//       date_applied VARCHAR(50) NOT NULL,
//       next json,
//       notes json,
//       favorite BOOLEAN NOT NULL,
//       FOREIGN KEY (list_user_id) REFERENCES userInfo (user_id)
//     ) ENGINE=InnoDB;`,

//     (err) => {
//         if (err) {
//             return console.error(err.message);
//         }
//         console.log("Successfully created the 'companyList' table");
//     }
//   )
// }

// const shareStatusTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='shareStatus'`;
// pool.query(shareStatusTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'shareStatus' does not exist");
//     // createShareStatusTable();
//   } else {
//     console.log("Table 'shareStatus' exists");
//     // createShareStatusTable()
//   }
// });

// const createShareStatusTable = () => {
//     pool.query(`DROP TABLE IF EXISTS shareStatus`);  

//     pool.query(
//       `CREATE TABLE shareStatus(
//           post_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
//           post_user_id INT NOT NULL,
//           total_applied VARCHAR(10) NOT NULL,
//           total_onprocess VARCHAR(10) NOT NULL,
//           total_noresponse VARCHAR(10) NOT NULL,
//           total_offered VARCHAR(10) NOT NULL,
//           total_declined VARCHAR(10) NOT NULL,
//           today_applied VARCHAR(10) NOT NULL,
//           today_onprocess VARCHAR(10) NOT NULL,
//           today_noresponse VARCHAR(10) NOT NULL,
//           today_offered VARCHAR(10) NOT NULL,
//           today_declined VARCHAR(10) NOT NULL,
//           post_message VARCHAR(70),
//           post_create_date VARCHAR(50) NOT NULL,
//           FOREIGN KEY (post_user_id) REFERENCES userInfo (user_id)
//       ) ENGINE=InnoDB;`,

//       (err) => {
//           if (err) {
//               return console.error(err.message);
//           }
//           console.log("Successfully created the 'shareStatus' table");
//       }
//     ); 
// }

// const likePostTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='likePost'`;
// pool.query(likePostTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'likePost' does not exist");
//     // createlikePostTable();
//   } else {
//     console.log("Table 'likePost' exists");
//     // createlikePostTable()
//   }
// });

// const createlikePostTable = () => {
//     pool.query(`DROP TABLE IF EXISTS likePost`);  

//     pool.query(
//       `CREATE TABLE likePost(
//           likePost_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
//           likePost_user_id INT NOT NULL,
//           likePost_post_id INT NOT NULL,
//           FOREIGN KEY (likePost_user_id) REFERENCES userInfo (user_id),
//           FOREIGN KEY (likePost_post_id) REFERENCES shareStatus (post_id)
//       ) ENGINE=InnoDB;`,

//       (err) => {
//           if (err) {
//               return console.error(err.message);
//           }
//           console.log("Successfully created the 'likePost' table");
//       }
//     ); 
// }

// const commentPostTableSql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='comment'`;
// pool.query(commentPostTableSql, (err, data) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   if (data.length === 0) {
//     console.log("Table 'comment' does not exist");
//     // createCommentTable();
//   } else {
//     console.log("Table 'comment' exists");
//     // createCommentTable()
//   }
// });

// const createCommentTable = () => {
//     pool.query(`DROP TABLE IF EXISTS comment`);  

//     pool.query(
//       `CREATE TABLE comment(
//           comment_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
//           comment_user_id INT NOT NULL,
//           comment_post_id INT NOT NULL,
//           comment VARCHAR(100) NOT NULL,
//           comment_date VARCHAR(50) NOT NULL,
//           FOREIGN KEY (comment_user_id) REFERENCES userInfo (user_id),
//           FOREIGN KEY (comment_user_id) REFERENCES shareStatus (post_id)
//       ) ENGINE=InnoDB;`,

//       (err) => {
//           if (err) {
//               return console.error(err.message);
//           }
//           console.log("Successfully created the 'comment' table");
//       }
//     ); 
// }




// module.exports = pool.promise();

