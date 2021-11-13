const dbConnection = require('../database/connection')

const getMunicipios = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_municipio'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

module.exports = {
    getMunicipios,
}