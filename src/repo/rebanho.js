const dbConnection = require('../database/connection')
const produtorRepo = require('./produtor')
const propriedadeRepo = require('./propriedade')

const save = async (id_propriedade, quantidade, id_especie) => {
    let query = ''
    const sql = await dbConnection()
    const saldoTotal = await getSaldoTotal(id_propriedade, id_especie)
    if (saldoTotal === 0) query = `insert into tb_rebanho values (${quantidade}, ${id_especie}, ${id_propriedade})`
    else query = `update tb_rebanho set quantidade = quantidade + ${quantidade} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Rebanho inserido com sucesso')
        })
    })
}

// Para atualizar quando uma venda é realizada
const removeSaldoTotal = async (quantidade, id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `update tb_rebanho set quantidade = quantidade - ${quantidade} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Rebanho removido com sucesso')
        })
    })
}

const remove = async (id_rebanho) => {
    const sql = await dbConnection()
    const query = `delete from tb_rebanho where id = ${id_rebanho}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.rowsAffected[0] > 0) resolve('Rebanho excluído com sucesso')
                else resolve('Nenhum registro encontrado')
            }
        })
    })
}

const getByProdutor = async (cpf) => {
    const rebanho = []
    return new Promise((resolve, reject) => {
        try {
            produtorRepo.getByCpf(cpf)
                .then(produtor => propriedadeRepo.getByProdutor(produtor.id))
                .then(propriedades => {
                    propriedades.forEach(propriedade => {
                        getByIdPropriedade(propriedade.id)
                            .then(rebanhos => {
                                rebanhos.forEach(rebanhoUn => rebanho.push(rebanhoUn))
                            })
                            .finally(() => resolve(rebanho))
                    })
                })
        } catch (err) {
            reject(err)
        }
    })
}

const getByIdPropriedade = async (id) => {
    const sql = await dbConnection()
    let query = `select * from tb_rebanho where id_propriedade=${id}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Não foram encontrados rebanhos para essa propriedade')
            }
        })
    })
}


const getByPropriedade = async (inscricao_estadual) => {
    const sql = await dbConnection()
    let query = `select * from rebanhoPelaPropriedade('${inscricao_estadual}')`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve('Não foram encontrados rebanhos para essa propriedade')
            }
        })
    })
}

const getSaldoTotal = async (id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `select quantidade from tb_rebanho where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve(0)
            }
        })
    })
}

const getSaldoVacinado = async (id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `select quantidade from tb_rebanho_vacinado where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve(0)
            }
        })
    })
}

const saveSaldoVacinado = async (quantidade, id_propriedade, id_especie, id_ultima_vacina) => {
    let query = ''
    const sql = await dbConnection()
    const saldoVacinado = await getSaldoVacinado(id_propriedade, id_especie)
    if (saldoVacinado === 0) query = `insert into tb_rebanho_vacinado values (${quantidade}, ${id_especie}, ${id_propriedade}, ${id_ultima_vacina})`
    else query = `update tb_rebanho_vacinado set quantidade = quantidade + ${quantidade}, id_ultima_vacina = ${id_ultima_vacina} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

// Para atualizar quando uma venda é realizada
const removeSaldoVacinado = async (quantidade, id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `update tb_rebanho_vacinado set quantidade = quantidade - ${quantidade} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = {
    save,
    remove,
    getByProdutor,
    getByPropriedade,
    getSaldoTotal,
    getSaldoVacinado,
    saveSaldoVacinado,
    removeSaldoTotal,
    removeSaldoVacinado,
}