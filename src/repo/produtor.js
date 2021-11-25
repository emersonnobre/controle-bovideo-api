const dbConnection = require('../database/connection')

const getAll = async () => {
    const sql = await dbConnection()
    const query = 'select * from tb_produtor order by nome'
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
    
}

const getByCpf = async (cpf) => {
    const sql = await dbConnection()
    const query = `select * from tb_produtor where cpf = '${cpf}'`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getById = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_produtor where id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if(result.recordset.length > 0) resolve(result.recordset[0])
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const getByPropriedade = async (id) => {
    const sql = await dbConnection()
    const query = `select tb_produtor.id, tb_produtor.nome from tb_produtor, tb_propriedade where tb_propriedade.id_produtor = tb_produtor.id and tb_propriedade.id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getLastProdutor = async () => {
    const sql = await dbConnection()
    const query = `select top 1 * from tb_produtor order by id desc`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

const save = async (nome, cpf) => {
    const sql = await dbConnection()
    const query = `insert into tb_produtor values ('${nome}', '${cpf}')`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                getLastProdutor().then(resolve).catch(reject)
            }
        })
    })
}

const update = async (nome, cpf, id) => {
    const sql = await dbConnection()
    const query = `update tb_produtor set nome = '${nome}', cpf = '${cpf}' where id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.rowsAffected[0] > 0) resolve('Produtor atualizado com sucesso')
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

module.exports = {
    getAll,
    getByCpf,
    getById,
    getByPropriedade,
    getLastProdutor,
    save,
    update,
}