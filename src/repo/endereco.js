const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_endereco'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

const getByIdProdutor = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_endereco where id_produtor = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

module.exports = {
    getAll,
    getByIdProdutor,
}