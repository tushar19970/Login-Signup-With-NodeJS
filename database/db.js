const knex = require("knex")({
    client : "mysql",
    connection :{
        host : "127.0.0.1",
        user : "root",
        password : "password",
        database : "details"
    }
});

knex.schema.createTable("signup", (table) => {
    table.increments("id")
    table.string("name")
    table.string("email")
    table.string("password")
}).then((data) => {
    console.log("Table Created")
}).catch((err) => {
    console.log("Table is already created")
});

module.exports = knex 