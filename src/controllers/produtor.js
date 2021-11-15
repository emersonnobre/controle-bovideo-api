const produtorRepo = require('../repo/produtor')
const produtorDomain = require('../domain/produtor')

const getProdutores = async (req, res) => {
    produtorRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getProdutor = async (req, res) => {
    const cpf = req.params.cpf
    produtorRepo.getByCpf(cpf)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const addProdutor = async (req, res) => {
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).send('Informe os campos necessários')
    const produtor = produtorDomain.create(nome, cpf)
    const valid = await produtor.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    produtorRepo.save(nome, cpf)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err))
}

const updateProdutor = async (req, res) => {
    const { id } = req.params
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).send('Informe os campos necessários')
    const produtor = produtorDomain.create(nome, cpf)
    const valid = produtor.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    produtorRepo.update(nome, cpf, id)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getProdutores,
    getProdutor,
    addProdutor,
    updateProdutor
}