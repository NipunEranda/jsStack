const syncsql = require('sync-sql');

const secret = 'beePLUS@2021';
const tokenExpireAfter = '5h';
const hostIP = 'localhost';
const hostPORT = '5000';
const emailUser = 'beeplus.softwarendcreative@outlook.com';
const emailPw = 'bEEpLusOutlookPwd13@#!';

//Database credentials and connection links
db = {
    host: '3.90.204.186',
    user: 'dev',
    password: '1234',
    database: 'beeplus_um',
    multipleStatements: true
}

//Exports list
module.exports = {
    secret,
    tokenExpireAfter,
    hostIP,
    db,
    hostPORT,
    emailUser,
    emailPw,
    //Execute Mysql commands
    executeQuery: (sql) => {
        return syncsql.mysql(db, sql);
    }
}