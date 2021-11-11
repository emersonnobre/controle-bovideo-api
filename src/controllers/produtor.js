const dbConnection = require('../database/connection')

const getProdutores = async (req, res, next) => {
    const sql = await dbConnection()
    const query = 'select * from tb_produtor'
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err.message)
        res.status(200).json(result.recordset)
    })
}

const getProdutor = async (req, res, next) => {
    const cpf = req.params.cpf
    if (!cpf) return res.status(404).end()
    const sql = await dbConnection()
    const query = `select * from tb_produtor where cpf = '${cpf}'`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err.message)
        if (result.recordset.length > 0) return res.status(200).send(result.recordset[0]).end()
        return res.status(404).send(res.statusMessage).end()
    })
}

const addProdutor = async (req, res, next) => {
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).send('Informe os campos nome e cpf').end()
    const sql = await dbConnection()
    const query = `insert into tb_produtor values ('${nome}', '${cpf}')`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err.message)
        if (result.rowsAffected[0] > 0) res.status(201).send('Inserido com sucesso').end()
    })
}

const updateProdutor = async (req, res, next) => {
    const id = req.params.id
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).end()
    const sql = await dbConnection()
    const query = `update tb_produtor set nome = '${nome}', cpf = '${cpf}' where id = ${id}`
    sql.request().query(query, (err, result) => {
        if (err) throw new Error('Erro na consulta: ' + err.message)
        if (result.rowsAffected[0] > 0) res.status(200).send('Alterado com sucesso').end()
    })
}

module.exports = {
    getProdutores,
    getProdutor,
    addProdutor,
    updateProdutor
}