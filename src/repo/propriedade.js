const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = `
    select p.id, p.nome, p.inscricao_estadual, p.id_produtor, p.id_municipio, m.descricao as municipio, prod.nome as produtor 
    from tb_propriedade as p, tb_municipio as m, tb_produtor as prod
    where p.id_municipio = m.id and
    p.id_produtor = prod.id
    order by p.nome
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getByInscricao = async (inscricao_estadual) => {
    const sql = await dbConnection()
    const query = `
    select p.id, p.nome, p.inscricao_estadual, p.id_produtor, p.id_municipio, m.descricao as municipio, prod.nome as produtor 
    from tb_propriedade as p, tb_municipio as m, tb_produtor as prod
    where p.id_municipio = m.id and
    p.id_produtor = prod.id and
    p.inscricao_estadual = '${inscricao_estadual}'
    order by p.nome
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

const getByProdutor = async (id) => {
    const sql = await dbConnection()
    const query = `
    select p.id, p.nome, p.inscricao_estadual, p.id_produtor, p.id_municipio, m.descricao as municipio, prod.nome as produtor 
    from tb_propriedade as p, tb_municipio as m, tb_produtor as prod
    where p.id_municipio = m.id and
    p.id_produtor = prod.id and 
    p.id_produtor = ${id}
    order by p.nome
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getById = async (id) => {
    const sql = await dbConnection()
    const query = `
    select p.id, p.nome, p.inscricao_estadual, p.id_produtor, p.id_municipio, m.descricao as municipio, prod.nome as produtor 
    from tb_propriedade as p, tb_municipio as m, tb_produtor as prod
    where p.id_municipio = m.id and
    p.id_produtor = prod.id and 
    p.id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
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
    getById,
    save,
    update,
}