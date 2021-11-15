const produtorRepo = require('../repo/produtor')

const create = (nome, cpf) => {
    return {
        nome,
        cpf,
        async valid () {
            if (!validateNome(this.nome)) return { valid: false, msg: 'Nome inválido' }
            //if(!validateCpf(this.cpf)) return { valid: false, msg: 'CPF inválido' }
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

const validateCpf = (cpf) => {
    let soma;
    let resto;
    soma = 0;

    if (cpf == "00000000000") return false;

    for (i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}

const searchCpf = async (cpf) => {
    const result = await produtorRepo.getByCpf(cpf)
    if (typeof(result) === 'string') return false
    return true
}

module.exports = {
    create,
}