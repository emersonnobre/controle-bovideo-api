const dbConnection = require('../database/connection')

const getMunicipios = async (req, res, next) => {
    const sql = await dbConnection()
    const query = 'select * from tb_municipio'
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ', err.message)
        res.status(200).json(result.recordset)
    })
}

module.exports = {
    getMunicipios
}