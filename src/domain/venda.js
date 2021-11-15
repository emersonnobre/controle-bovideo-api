const rebanhoRepo = require('../repo/rebanho')
const registroVacinacaoRepo = require('../repo/registro_vacina')

const create = (quantidade, id_propriedade_destino, id_propriedade_origem, id_especie, finalidade) => {
    return {
        quantidade,
        id_propriedade_destino,
        id_propriedade_origem,
        id_especie,
        finalidade,
        async valid () {
            return await verifyRebanhoVacinado(this.id_propriedade_origem, this.id_especie, this.quantidade)
        }
    }
} 

const verifyRebanhoVacinado = async (id_propriedade, id_especie, quantidade) => {
    const saldoVacinado = await rebanhoRepo.getSaldoVacinado(id_propriedade, id_especie)
    if (saldoVacinado.quantidade < quantidade) return { valid: false, msg: 'A propriedade de origem não possui saldo suficiente de animais desta espécie vacinados para venda.' }
    const ultimoAnoVacinado = await registroVacinacaoRepo.getUltimoRegistro(id_propriedade, id_especie) /* Pega o ultimo ano que essa especie foi vacinada */
    if (Object.values(ultimoAnoVacinado)[0] < new Date().getFullYear()) return { valid: false, msg: 'A propriedade de origem possui saldo suficiente de animais desta espécie vacinados para venda porém eles não estão devidamente vacinados.' }
    return { valid: true, msg: 'Venda feita com sucesso' }
}

module.exports = {
    create,
}