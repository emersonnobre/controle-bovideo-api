const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_propriedade'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const getByInscricao = async (inscricao_estadual) => {
    const sql = await dbConnection()
    const query = `select * from tb_propriedade where inscricao_estadual = '${inscricao_estadual}'`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const getByProdutor = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_propriedade where id_produtor = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const save = async (nome, inscricao_estadual, id_municipio, id_produtor) => {
    const sql = await dbConnection()
    const query = `
    insert into tb_propriedade (nome, inscricao_estadual, id_municipio, id_produtor) 
    values ('${nome}', '${inscricao_estadual}', ${id_municipio}, ${id_produtor})
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Propriedade inserida com sucesso')
        })
    })
}

const update = async (nome, inscricao_estadual, id_municipio, id_produtor) => {
    const sql = await dbConnection()
    const query = `
    update tb_propriedade 
    set nome = '${nome}', inscricao_estadual = '${inscricao_estadual}', 
    id_municipio = '${id_municipio}', id_produtor = '${id_produtor}' 
    where inscricao_estadual = '${inscricao_estadual}'
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.rowsAffected[0] > 0) resolve('Propriedade atualizada com sucesso')
                else resolve('Nenhum registro foi encontrado')
            } 
        })
    })
}

module.exports = {
    getAll,
    getByInscricao,
    getByProdutor,
    save,
    update,
}