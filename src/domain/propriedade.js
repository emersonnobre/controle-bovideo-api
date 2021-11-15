const propriedadeRepo = require('../repo/propriedade')

const create = (nome, inscricao_estadual, id_municipio, id_produtor) => {
    return {
        nome,
        inscricao_estadual,
        id_municipio,
        id_produtor,
        async valid () {
            if (!validateNome(this.nome)) return { valid: false, msg: 'Nome inválido' }
            const found = await searchInscricao(this.inscricao_estadual) 
            if (found) return { valid: false, msg: 'Inscrição estadual já cadastrada' }
            return { valid: true, msg: 'Propriedade inserida com sucesso' }
        }
    }
}

const validateNome = (nome) => {
    if (nome.length === 0) return false
    else if (!nome.trim()) return false
    else return true
}

const validateInscricao = (inscricao) => {
//todo
}

const searchInscricao = async (inscricao) => {
    const result = await propriedadeRepo.getByInscricao(inscricao)
    if (typeof(result) === 'string') return false
    return true
}

module.exports = {
    create
}