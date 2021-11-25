const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_vacina'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const get = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_vacina where id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

module.exports = {
    getAll,
    get,
}