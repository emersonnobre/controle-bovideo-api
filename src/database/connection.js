const mssql = require('mssql/msnodesqlv8')
const config = require('../config/database')

const connect = async () => {
    return await new mssql.connect(config)
}

module.exports = connect