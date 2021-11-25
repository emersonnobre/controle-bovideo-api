const dbConnection = require('../database/connection')
const produtorRepo = require('./produtor')
const propriedadeRepo = require('./propriedade')

const getAll = async () => {
    const query = `
    select
    r.id, r.quantidade, r.id_especie, r.id_propriedade, e.descricao as especie, prop.nome as propriedade, prod.nome as produtor
    from tb_rebanho as r, tb_especie as e, tb_propriedade as prop, tb_produtor as prod
    where r.id_especie = e.id and
    r.id_propriedade = prop.id and
    prop.id_produtor = prod.id
    order by prop.nome
    `
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getAllVacinados = async () => {
    const query = `
    select
    r.id, r.quantidade, r.id_especie, r.id_propriedade, r.id_vacina, e.descricao as especie, prop.nome as propriedade, prod.nome as produtor, v.descricao as vacina
    from tb_rebanho_vacinado as r, tb_especie as e, tb_propriedade as prop, tb_produtor as prod, tb_vacina as v
    where r.id_especie = e.id and
    r.id_propriedade = prop.id and
    prop.id_produtor = prod.id and
    r.id_vacina = v.id
    order by prop.nome
    `
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getAllEntradas = async () => {
    const query = `
    select
    r.id, r.quantidade, r.id_especie, r.id_propriedade, r.data_insercao, e.descricao as especie, prop.nome as propriedade, prod.nome as produtor
    from tb_entrada_animais as r, tb_especie as e, tb_propriedade as prop, tb_produtor as prod
    where r.id_especie = e.id and
    r.id_propriedade = prop.id and
    prop.id_produtor = prod.id
    order by prop.nome
    `
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getEntrada = async (id) => {
    const query = `
    select * from tb_entrada_animais where id = ${id}
    `
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset[0])
        })
    })
}

const getByProdutor = async (cpf) => {
    const sql = await dbConnection()
    const query = 
    `
    select
    r.id, r.quantidade, r.id_especie, r.id_propriedade, e.descricao as especie, prop.nome as propriedade, prod.nome as produtor
    from tb_rebanho as r, tb_especie as e, tb_propriedade as prop, tb_produtor as prod
    where r.id_especie = e.id and
    r.id_propriedade = prop.id and
    prop.id_produtor = prod.id and
    prod.cpf = '${cpf}'
    order by prop.nome
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) {reject(err); console.log(err)}
            else resolve(result.recordset)
        })
    })
}

const getByPropriedade = async (inscricao) => {
    const sql = await dbConnection()
    let query = `
    select
    r.id, r.quantidade, r.id_especie, r.id_propriedade, e.descricao as especie, prop.nome as propriedade, prod.nome as produtor
    from tb_rebanho as r, tb_especie as e, tb_propriedade as prop, tb_produtor as prod
    where r.id_especie = e.id and
    r.id_propriedade = prop.id and
    prop.id_produtor = prod.id and
    prop.inscricao_estadual='${inscricao}'
    order by prop.nome
    `
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result.recordset)
        })
    })
}

const getSaldoTotal = async (id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `select * from tb_rebanho where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve({quantidade: 0})
            }
        })
    })
}

const getSaldoVacinado = async (id_propriedade, id_especie) => {
    const sql = await dbConnection()
    const query = `select * from tb_rebanho_vacinado where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else {
                if (result.recordset.length > 0) resolve(result.recordset[0])
                else resolve({quantidade: 0})
            }
        })
    })
}

const save = async (id_propriedade, quantidade, id_especie) => {
    let query = ``
    const sql = await dbConnection()
    const saldoTotal = await getSaldoTotal(id_propriedade, id_especie)
    if (!saldoTotal.id_especie) query = `insert into tb_rebanho values (${quantidade}, ${id_especie}, ${id_propriedade})`
    else query = `update tb_rebanho set quantidade = quantidade + ${quantidade} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve('Rebanho inserido com sucesso')
        })
    })
}

const saveSaldoVacinado = async (quantidade, id_propriedade, id_especie, id_ultima_vacina) => {
    let query = ''
    const sql = await dbConnection()
    const saldoVacinado = await getSaldoVacinado(id_propriedade, id_especie)
    console.log('saldozinho: ', saldoVacinado)
    if (!saldoVacinado.id_especie) query = `insert into tb_rebanho_vacinado values (${quantidade}, ${id_especie}, ${id_propriedade}, ${id_ultima_vacina})`
    else query = `update tb_rebanho_vacinado set quantidade = quantidade + ${quantidade}, id_vacina = ${id_ultima_vacina} where id_propriedade = ${id_propriedade} and id_especie = ${id_especie}`
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

const saveEntradaAnimal = async (quantidade, id_propriedade, id_especie) => {
    const date = new Date()
    const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    await save(id_propriedade, quantidade, id_especie)
    let query = `insert into tb_entrada_animais values (${quantidade}, '${formatedDate}', ${id_especie}, ${id_propriedade})`
    const sql = await dbConnection()
    return new Promise((resolve, reject) => {
        sql.request().query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result)
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

const removeEntradaAnimal = async (id_rebanho) => {
    const sql = await dbConnection()
    const entrada = await getEntrada(id_rebanho)
    console.log(entrada)
    await removeSaldoTotal(entrada.quantidade, entrada.id_propriedade, entrada.id_especie)
    const query = `delete from tb_entrada_animais where id = ${id_rebanho}`
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
    saveEntradaAnimal,
    getAllVacinados,
    getAllEntradas,
    getAll,
    getByProdutor,
    getByPropriedade,
    getSaldoTotal,
    getSaldoVacinado,
    saveSaldoVacinado,
    removeSaldoTotal,
    removeSaldoVacinado,
    removeEntradaAnimal,
}