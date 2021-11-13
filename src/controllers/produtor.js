const produtorRepo = require('../repo/produtor')

const getProdutores = async (req, res) => {
    produtorRepo.getProdutores()
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

const getProdutor = async (req, res) => {
    const cpf = req.params.cpf
    produtorRepo.getProdutor(cpf)
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

const addProdutor = async (req, res) => {
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400).send('Informe os campos nome e cpf')
    produtorRepo.addProdutor({nome, cpf})
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

const updateProdutor = async (req, res) => {
    const id = req.params.id
    const { nome, cpf } = req.body
    if (!nome || !cpf) return res.status(400)
    produtorRepo.updateProdutor({id, nome, cpf})
    .then(response => res.send(response))
    .catch(err => res.send(err))
}

module.exports = {
    getProdutores,
    getProdutor,
    addProdutor,
    updateProdutor
}