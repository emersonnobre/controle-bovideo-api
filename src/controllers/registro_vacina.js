const dbConnection = require('../database/connection')

const addRegistroVacina = async (req, res, next) => {
    const { quantidadeAnimais, dataVacina, idVacina, idPropriedade, idEspecie } = req.body
    if (!quantidadeAnimais || !dataVacina || !idVacina || !idPropriedade || !idEspecie) return res.status(400).send('Informe os campos necessários').end()
    const sql = await dbConnection()
    const query = `insert into tb_registro_vacina values (${quantidadeAnimais}, '${dataVacina}', ${idVacina}, ${idPropriedade}, ${idEspecie})`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err.message)
        if (result.rowsAffected[0] > 0) res.status(201).send('Inserido com sucesso').end()
    })
}

const deleteRegistroVacina = async (req, res, next) => {
    const { idRegistroVacina } = req.params
    const sql = await dbConnection()
    const query = `delete from tb_registro_vacina where id = ${idRegistroVacina}`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err)
        if (result.rowsAffected[0] > 0) return res.status(200).send('Registro de vacina cancelado').end()
        res.status(204).send('Registro de vacina não encontrado').end()
    })
}

const getRegistroVacina = async (req, res, next) => {
    const { inscricaoEstadual } = req.params
    const sql = await dbConnection()
    let query = `select * from registroVacinaPelaPropriedade('${inscricaoEstadual}')`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta de propriedade: ' + err)
        if (result.recordset.length > 0)  return res.json(result.recordset)
        else return res.send('A propriedade não foi encontrada')
    })
    
}

module.exports = {
    addRegistroVacina,
    deleteRegistroVacina,
    getRegistroVacina,
}