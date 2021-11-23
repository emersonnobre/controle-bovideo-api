const dbConnection = require('../database/connection')
const produtorRepo = require('./produtor')
const rebanhoRepo = require('../repo/rebanho')

const getAll = async () => {
    const query = 'select * from tb_venda'
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const get = async (id_venda) => {
    const sql = await dbConnection()
    const query = `select * from tb_venda where id = ${id_venda}`
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

const getByPropriedadeFilterByDate = async (id_propriedade, id_especie, date) => {
    const sql = await dbConnection()
    console.log()
    const query = `
    select * from tb_venda where id_propriedade_origem = ${id_propriedade} and
    id_especie = ${id_especie} and
    data_venda >= ${date}
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset)
                else resolve(0)
            }
        })
    })
}

const save = async (quantidade, id_propriedade_destino, id_propriedade_origem, id_especie, finalidade) => {
    const sql = await dbConnection()
    const date = new Date()
    const formatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const query = `insert into tb_venda values (${quantidade}, '${finalidade}', '${formatedDate}', ${id_especie}, ${id_propriedade_origem}, ${id_propriedade_destino})`
    return new Promise((resolve, reject) => {
        sql.request().query(query, async (err, result) => {
            if (err) reject(err)
            try {
                const produtor = await produtorRepo.getByPropriedade(id_propriedade_destino)
                await addCompra(produtor.id)
                await rebanhoRepo.save(id_propriedade_destino, quantidade, id_especie)
                await rebanhoRepo.saveSaldoVacinado(quantidade, id_propriedade_destino, id_especie, 1)
                await rebanhoRepo.removeSaldoTotal(quantidade, id_propriedade_origem, id_especie)
                await rebanhoRepo.removeSaldoVacinado(quantidade, id_propriedade_origem, id_especie)
            } catch (err) {
                reject(err)
            }
            resolve('Venda inserida com sucesso')
        })
    })
}

const remove = async (id_venda) => {
    await removeCompra(id_venda)
    const sql = await dbConnection()
    const query = `delete from tb_venda where id = ${id_venda}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, async (err, result) => {
            if (err) reject(err)
            else {
                if (result.rowsAffected[0] > 1) resolve('Venda removida com sucesso')
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const addCompra = async (id_produtor) => {
    const sql = await dbConnection()
    let query = `select top 1 * from tb_venda order by id DESC`
    sql.request().query(query, (err, result) => {
        if (err) return console.log(err)
        let id_venda = result.recordset[0].id
        query = `insert into tb_compra (id_venda, id_produtor) values (${id_venda}, ${id_produtor})` 
        sql.request().query(query, (err, result) => {
            if (err) return console.log(err)
        })
    })
}

const removeCompra = async (idVenda) => {
    const sql = await dbConnection()
    const query = `delete from tb_compra where id_venda = ${idVenda}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.rowsAffected[0] > 1) resolve('Compra removida com sucesso')
                else resolve('Nenhum registro foi encontrado')
            }
        })
    })
}

const getVendasByProdutor = async (cpf) => {
    const sql = await dbConnection()
    const query = `
    select v.quantidade, v.finalidade, v.id_especie, v.id_propriedade_origem, v.id_propriedade_destino from tb_venda as v, tb_produtor, tb_propriedade where 
    v.id_propriedade_origem = tb_propriedade.id and
	tb_propriedade.id_produtor = tb_produtor.id and
    tb_produtor.cpf = '${cpf}'
    ` /* TODO: fazer esse negocio com funcao sql */
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

const getComprasByProdutor = async (cpf) => {
    const sql = await dbConnection()
    const query = `
    select * from tb_compra, tb_produtor where 
    tb_compra.id_produtor = tb_produtor.id and
    tb_produtor.cpf = '${cpf}' 
    ` /* TODO: fazer esse negocio com funcao sql */
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

module.exports = {
    save,
    remove,
    getAll,
    getVendasByProdutor,
    getComprasByProdutor,
    getByPropriedadeFilterByDate,
}