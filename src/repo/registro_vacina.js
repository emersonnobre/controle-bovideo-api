const dbConnection = require('../database/connection')
const rebanhoRepo = require('../repo/rebanho')
const vendaRepo = require('../repo/venda')

const save = async (quantidade_animais, id_propriedade, id_especie, id_vacina, data_vacina) => {
    const sql = await dbConnection()
    await rebanhoRepo.saveSaldoVacinado(quantidade_animais, id_propriedade, id_especie, id_vacina)
    let query = `
    insert into tb_registro_vacina values 
    (${quantidade_animais}, '${data_vacina}', ${id_vacina}, ${id_propriedade}, ${id_especie})
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Registro de vacina inserido com sucesso')
        })
    })
}

const remove = async (idRegistro) => {
    const sql = await dbConnection()
    const registro = await getById(idRegistro)
    const vendas = await vendaRepo.getByPropriedadeFilterByDate(registro.id_propriedade, registro.id_especie, registro.data_vacina)
    console.log(vendas)
    const query = `delete from tb_registro_vacina where id = ${idRegistro}`
    return new Promise((resolve, reject) => {
        // sql.request().query(query, (err, result) => {
        //     if (err) reject(err.message)
        //     else {
        //         if (result.rowsAffected[0] > 0) resolve('Registro de vacina cancelado')
        //         else resolve('Registro de vacina não encontrado')
        //     }
        // })
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
    let query = `select * from registroVacinaPelaPropriedade('${inscricao_estadual}')`
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
    const query = 'select * from tb_registro_vacina'
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
    const query = `select top 1 year(data_vacina) from tb_registro_vacina where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
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