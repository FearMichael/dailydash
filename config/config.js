require("dotenv").config();

module.exports = {
    "development": {
        "username": process.env.DBUSER,
        "password": process.env.DBPASS,
        "database": process.env.DBNAME,
        "host": process.env.DBHOST,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "testdb",
        "host": "localhost",
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "use_env_variable": process.env.JAWSDB_URL,
        "dialect": "mysql"
    }

};