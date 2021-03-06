const produtorRepo = require('../repo/produtor')
const produtorDomain = require('../domain/produtor')

const getProdutores = async (req, res) => {
    produtorRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getProdutorByCpf = async (req, res) => {
    const cpf = req.query.cpf
    produtorRepo.getByCpf(cpf)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getProdutorById = async (req, res) => {
    const id = req.query.id
    produtorRepo.getById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const addProdutor = async (req, res) => {
    const { nome, cpf } = req.body
    console.log(req.body)
    if (!nome || !cpf) return res.status(400).send('Informe os campos necessários')
    const produtor = produtorDomain.create(nome, cpf)
    const valid = await produtor.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    produtorRepo.save(nome, cpf)
        .then(response => {res.status(201).json(response); console.log(response)})
        .catch(err => res.status(500).send(err))
}

const updateProdutor = async (req, res) => {
    const { id } = req.params
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).send('Informe os campos necessários')
    const produtor = produtorDomain.create(nome, cpf)
    const valid = produtor.valid()
    if (valid.valid === false) return res.status(400).json(valid.msg)
    produtorRepo.update(nome, cpf, id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getProdutores,
    getProdutorByCpf,
    getProdutorById,
    addProdutor,
    updateProdutor
}