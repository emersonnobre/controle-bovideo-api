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
            const ano = data.temRegistro ? Object.values(data.ano)[0] : false
            const anoAtual = new Date().getFullYear()
            if (ano == anoAtual) {
                const saldoValido = await validateVacinados(id_propriedade, id_especie)
                if (saldoValido) return { valid: true, msg: 'Pode vacinar, seu saldo total é maior que o vacinado' }
                return { valid: false, msg: 'Todos os animais já foram vacinados esse ano' }
            } else {
                return { valid: true, msg: 'Não possui registro de vacinação esse ano, tá liberado' }
            }
        }
    }
}

// Verifica o ano da ultima vacina dos animais em questão
const validateAno = async (id_propriedade, id_especie) => {
    const ano = await registroVacinaRepo.getUltimoRegistro(id_propriedade, id_especie)
    if (typeof ano === 'string') return { temRegistro: false }
    else return { temRegistro: true, ano: ano }
}

// Verifica se o saldo de animais total é maior que o saldo de animais vacinados
const validateVacinados = async (id_propriedade, id_especie) => {
    const saldoTotal = await rebanhoRepo.getSaldoTotal(id_propriedade, id_especie)
    const saldoVacinado = await rebanhoRepo.getSaldoVacinado(id_propriedade, id_especie)
    console.log(`
    Saldo total: ${saldoTotal.quantidade}\n
    Saldo vacinado: ${saldoVacinado.quantidade}
    `)
    if (saldoTotal.quantidade > saldoVacinado.quantidade) return true
    return false
}

module.exports = {
    create,
}

