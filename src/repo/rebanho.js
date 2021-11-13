const dbConnection = require('../database/connection')

const addRebanho = async (rebanho) => {
    const sql = await dbConnection()
    const query = `insert into tb_rebanho values (${rebanho.quantidade}, ${rebanho.idEspecie}, ${rebanho.idPropriedade})`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else resolve('Rebanho inserido com sucesso')
        })
    })
}

const deleteRebanho = async (idRebanho) => {
    const sql = await dbConnection()
    const query = `delete from tb_rebanho where id = ${idRebanho}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.rowsAffected[0] > 0) resolve('Rebanho excluído com sucesso')
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

const getAnimaisByProdutor = async (cpfProdutor) => {
    const sql = await dbConnection()
    let query = `select * from rebanhoPeloProprietario('${cpfProdutor}')`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Não foram encontrados rebanhos para esse produtor')
            }    
        })
    })  
}

const getAnimaisByPropriedade = async (inscricao) => {
    const sql = await dbConnection()
    let query = `select * from rebanhoPelaPropriedade('${inscricao}')`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Não foram encontrados rebanhos para essa propriedade')
            }
        })
    })
}

module.exports = {
    addRebanho,
    deleteRebanho,
    getAnimaisByProdutor,
    getAnimaisByPropriedade,
}