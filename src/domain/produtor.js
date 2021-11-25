const produtorRepo = require('../repo/produtor')

const create = (nome, cpf) => {
    return {
        nome,
        cpf,
        async valid () {
            if (!validateNome(this.nome)) return { valid: false, msg: 'Nome inválido' }
            const found = await searchCpf(this.cpf)
            if (found) return { valid: false, msg: 'CPF já cadastrado' }
            return { valid: true, msg: 'Produtor inserido com sucesso' }
        } 
    }
}

const validateNome = (nome) => {
    if (nome.length === 0) return false
    else if (!nome.trim()) return false
    else return true
}

const searchCpf = async (cpf) => {
    const result = await produtorRepo.getByCpf(cpf)
    if (result.length > 0) return true
    return false
}

module.exports = {
    create,
}