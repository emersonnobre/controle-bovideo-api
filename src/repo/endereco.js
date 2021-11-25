const dbConnection = require('../database/connection')
const produtorRepo = require('./produtor')

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

const post = async (rua, numero, id_municipio, principal, id_produtor) => {
    const sql = await dbConnection()
    principal = principal == true ? 1 : 0
    const query = `insert into tb_endereco values ('${rua}', '${numero}', ${principal}, ${id_produtor}, ${id_municipio})`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Endereço inserido')
        })
    })
}

const put = async (id, rua, numero, id_municipio) => {
    const sql = await dbConnection()
    const query = `update tb_endereco set rua = '${rua}', numero = '${numero}', id_municipio=${id_municipio} where id=${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Endereço atualizado')
        })
    })
}

const deleteEndereco = async (id) => {
    const sql = await dbConnection()
    const query = `delete from tb_endereco where id = ${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Endereço removido')
        })
    })
}

module.exports = {
    getAll,
    getByIdProdutor,
    post,
    put,
    deleteEndereco
}