const mssql = require('mssql')
const config = require('../config/database')

const connect = async () => {
    return await mssql.connect(config)
}

module.exports = connect