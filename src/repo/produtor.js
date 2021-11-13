const dbConnection = require('../database/connection')

const getProdutores = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_produtor'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
    
}

const getProdutor = async (cpf) => {
    const sql = await dbConnection()
    const query = `select * from tb_produtor where cpf = '${cpf}'`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if(result.recordset.length > 0) resolve(result.recordset)
                else resolve('Produtor não encontrado')
            }
        })
    })
}

const getProdutorByPropriedade = async (idPropriedade) => {
    const sql = await dbConnection()
    const query = `select tb_produtor.id, tb_produtor.nome from tb_produtor, tb_propriedade where tb_propriedade.id_produtor = tb_produtor.id and tb_propriedade.id = ${idPropriedade}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else resolve(result.recordset[0])
        })
    })
}

const addProdutor = async (produtor) => {
    const sql = await dbConnection()
    const query = `insert into tb_produtor values ('${produtor.nome}', '${produtor.cpf}')`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else resolve('Produtor inserido com sucesso')
        })
    })
}

const updateProdutor = async (produtor) => {
    const sql = await dbConnection()
    const query = `update tb_produtor set nome = '${produtor.nome}', cpf = '${produtor.cpf}' where id = ${produtor.id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.rowsAffected[0] > 0) resolve('Produtor atualizado com sucesso')
                else resolve('Produtor não encontrado')
            }
        })
    })
}

module.exports = {
    getProdutores,
    getProdutor,
    getProdutorByPropriedade,
    addProdutor,
    updateProdutor,
}