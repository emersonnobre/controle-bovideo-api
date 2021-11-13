const dbConnection = require('../database/connection')
const { getProdutorByPropriedade } = require('./produtor')

const get = async (idVenda) => {
    const sql = await dbConnection()
    const query = `select * from tb_venda where id = ${idVenda}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

const save = async (venda) => {
    const sql = await dbConnection()
    const query = `insert into tb_venda values (${venda.quantidade}, '${venda.finalidade}', ${venda.idEspecie}, ${venda.idPropriedadeOrigem}, ${venda.idPropriedadeDestino})`
    return new Promise((resolve, reject) => {
        sql.request().query(query, async (err, result) => {
            if (err) reject(err.message)
            try {
                const produtor = await getProdutorByPropriedade(venda.idPropriedadeDestino)
                addCompra(produtor.id)
            } catch (err) {
                reject(err.message)
            }
            resolve('Venda inserida')
        })
    })
}

const remove = async (idVenda) => {
    await removeCompra(idVenda)
    const sql = await dbConnection()
    const query = `delete from tb_venda where id = ${idVenda}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, async (err, result) => {
            if (err) reject(err.message)
            else resolve('Venda removida')
        })
    })
}

const addCompra = async (idProdutor) => {
    const sql = await dbConnection()
    let query = `select top 1 * from tb_venda order by id DESC`
    sql.request().query(query, (err, result) => {
        if (err) return console.log(err.message)
        let idVenda = result.recordset[0].id
        query = `insert into tb_compra (id_venda, id_produtor) values (${idVenda}, ${idProdutor})` 
        sql.request().query(query, (err, result) => {
            if (err) return console.log(err.message)
        })
    })
}

const removeCompra = async (idVenda) => {
    const sql = await dbConnection()
    const query = `delete from tb_compra where id_venda = ${idVenda}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err.message)
            else {
                if (result.rowsAffected[0] > 1) resolve('Compra removida')
                else resolve('Nenhum registro encontrado')
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
            if (err) reject(err.message)
            else resolve(result.recordset)
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
            if (err) reject(err.message)
            else {
                console.log(result.recordset.length)
                if (result.recordset.length > 0) {
                    resolve(result.recordset)
                } else {
                    resolve('Nenhuma venda encontrada para este produtor')
                }
            }
        })
    })
}

module.exports = {
    save,
    remove,
    getVendasByProdutor,
    getComprasByProdutor,
}