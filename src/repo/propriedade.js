const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_propriedade'
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

const getByInscricao = async (inscricaoEstadual) => {
    const sql = await dbConnection()
    const query = `select * from tb_propriedade where inscricao_estadual = '${inscricaoEstadual}'`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

const getByProdutor = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_propriedade where id_produtor = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

const save = async (propriedade) => {
    const sql = await dbConnection()
    const query = `
    insert into tb_propriedade (nome, inscricao_estadual, id_municipio, id_produtor) 
    values ('${propriedade.nome}', '${propriedade.inscricaoEstadual}', ${propriedade.idMunicipio}, ${propriedade.idProdutor})
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else resolve('Propriedade inserida com sucesso')
        })
    })
}

const update = async (propriedade) => {
    const sql = await dbConnection()
    const query = `
    update tb_propriedade 
    set nome = '${propriedade.nome}', inscricao_estadual = '${propriedade.inscricaoEstadual}', 
    id_municipio = '${propriedade.idMunicipio}', id_produtor = '${propriedade.idProdutor}' 
    where inscricao_estadual = '${propriedade.inscricaoEstadual}'
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.rowsAffected[0] > 0) resolve('Propriedade atualizada com sucesso')
                else resolve('Nenhum registro encontrado')
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