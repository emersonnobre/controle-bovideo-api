// função que ve no banco o ano da ultima vacinacao dos animais da especie
// se for ano passado deixa vacinar todos, senao verifica a proxima funcao

// função que pega o numero total de animais da especie e o numero de vacinados (rebanhorepo)
// se o cara ja tiver vacinado todos (total=vacinado) nao pode 

// caso ocorra a vacinacao, adicionar nos vacinados o numero vacinado

// só pode excluir registrovacina/saldovacinado se o mano nao tiver vendido algo da especie apos a data do registro

const registroVacinaRepo = require('../repo/registro_vacina')
const rebanhoRepo = require('../repo/rebanho')

const create = (quantidade_animais, data_vacina, id_vacina, id_propriedade, id_especie) => {
    return {
        quantidade_animais,
        data_vacina, 
        id_especie, 
        id_vacina,
        id_propriedade,
        async valid () {
            const data = await validateAno(id_propriedade, id_especie)
            
            const ano = data.temRegistro ? data.ano : false
            console.log('data obtida: ', ano)
            const anoAtual = new Date().getFullYear()
            console.log('ano atual: ', anoAtual)
            if (ano == anoAtual) {
                const saldoValido = await validateVacinados(id_propriedade, id_especie, Number(quantidade_animais))
                console.log('saldo é: ', saldoValido)
                if (saldoValido.valido) return { valid: true, msg: saldoValido.msg }
                return { valid: false, msg: saldoValido.msg }
            } else {
                const saldoValido = await validateVacinados(id_propriedade, id_especie, Number(quantidade_animais))
                if (saldoValido.valido) return { valid: true, msg: 'Não possui registro de vacinação esse ano, tá liberado' }
                return { valid: false, msg: saldoValido.msg }
            }
        }
    }
}

// Verifica o ano da ultima vacina dos animais em questão
const validateAno = async (id_propriedade, id_especie) => {
    const registro = await registroVacinaRepo.getUltimoRegistro(id_propriedade, id_especie)
    console.log(registro)
    if (registro === 0) return { temRegistro: false }
    else return { temRegistro: true, ano: registro.ano }
}

// Verifica se o saldo de animais total é maior que o saldo de animais vacinados
const validateVacinados = async (id_propriedade, id_especie, quantidade) => {
    const saldoTotal = await rebanhoRepo.getSaldoTotal(id_propriedade, id_especie)
    const saldoVacinado = await rebanhoRepo.getSaldoVacinado(id_propriedade, id_especie)
    console.log(`
    Saldo total: ${saldoTotal.quantidade}\n
    Saldo vacinado: ${saldoVacinado.quantidade}
    `)
    console.log(saldoVacinado.quantidade + quantidade)
    if(saldoTotal.quantidade == 0) return {valido: false, msg: 'Essa propriedade não possui animais dessa espécie'}
    if (saldoTotal.quantidade >= (saldoVacinado.quantidade + quantidade)) return {valido: true, msg: 'Pode vacinar, seu saldo total é maior que o vacinado'}
    if (saldoTotal.quantidade == saldoVacinado.quantidade) return {valido: false, msg: 'Todos os seus animais já estão vacinados'}
    if (saldoTotal.quantidade < (saldoVacinado.quantidade + quantidade)) return {valido: false, msg: `Você pode vacinar no máximo ${saldoTotal.quantidade - saldoVacinado.quantidade} animal/animais dessa espécie`}
}

module.exports = {
    create,
}

