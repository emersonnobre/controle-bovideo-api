const dbConnection = require('../database/connection')
const rebanhoRepo = require('../repo/rebanho')
const vendaRepo = require('../repo/venda')

const save = async (quantidade_animais, id_propriedade, id_especie, id_vacina, data_vacina) => {
    const sql = await dbConnection()
    await rebanhoRepo.saveSaldoVacinado(quantidade_animais, id_propriedade, id_especie, id_vacina)
    let query = `
    insert into tb_registro_vacina values 
    (${quantidade_animais}, '${data_vacina}', ${id_especie}, ${id_propriedade}, ${id_vacina})
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) {reject(err); console.log(err)}
            else resolve('Registro de vacina inserido com sucesso')
        })
    })
}

const remove = async (idRegistro) => {
    const sql = await dbConnection()
    const registro = await getById(idRegistro)
    const data = new Date(registro.data_vacina)
    let dataFormatada = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate() + 1}`
    const vendas = await vendaRepo.getByPropriedadeFilterByDate(registro.id_propriedade, registro.id_especie, dataFormatada)
    console.log(vendas.length)
    const query = `delete from tb_registro_vacina where id = ${idRegistro}`
    return new Promise(async (resolve, reject) => {
        if (vendas.length > 0) return reject('Operação negada: venda posterior registrada')
        await rebanhoRepo.removeSaldoVacinado(registro.quantidade, registro.id_propriedade, registro.id_especie)
        sql.request().query(query, (err, result) => {
            if (vendas.length > 0) reject('Operação negada: venda posterior')
            if (err) reject(err.message)
            else resolve(result)
        })
    })
}

const getById = async (id) => {
    const sql = await dbConnection()
    const query = `select * from tb_registro_vacina where id = ${id}`
    console.log(query)
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

const getByPropriedade = async (inscricao_estadual) => {
    const sql = await dbConnection()
    let query = `
    select r.id, r.quantidade, r.data_vacina, r.id_especie, r.id_propriedade, r.id_vacina, e.descricao as especie, p.nome as propriedade, v.descricao as vacina
    from tb_registro_vacina as r, tb_especie as e, tb_propriedade as p, tb_vacina as v
    where r.id_especie = e.id and
    r.id_propriedade = p.id and
    r.id_vacina = v.id and
    p.inscricao_estadual ='${inscricao_estadual}'
    `
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

const getAll = async () => {
    const query = 
    `
    select r.id, r.quantidade, r.data_vacina, r.id_especie, r.id_propriedade, r.id_vacina, e.descricao as especie, p.nome as propriedade, v.descricao as vacina
    from tb_registro_vacina as r, tb_especie as e, tb_propriedade as p, tb_vacina as v
    where r.id_especie = e.id and
    r.id_propriedade = p.id and
    r.id_vacina = v.id
    `
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

// Pega o último ano em que um rebanho de uma especie foi vacinado em uma propriedade
const getUltimoRegistro = async (id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `select top 1 year(data_vacina) as ano from tb_registro_vacina where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
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

module.exports = {
    save,
    remove,
    getAll,
    getById,
    getByPropriedade,
    getUltimoRegistro,
}