const mysql = require('mysql2');


const connectionParams =	{
    host : "localhost",
    user : "root",
    password : "mustafa123",
    database : "nodedb"
}

const knex = require("knex")({
client: "mysql2",
connection: connectionParams,
});

module.exports = {knex };