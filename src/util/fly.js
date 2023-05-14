const { Client } = require('pg');

const flyClient = new Client({connectionString: process.env.FLY_DATABASE_URL})

module.exports = flyClient
