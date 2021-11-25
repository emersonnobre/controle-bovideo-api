const enderecoRepo = require('../repo/endereco')

const getAll = async (req, res) => {
    enderecoRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getByIdProdutor = async (req, res) => {
    const { id_produtor }= req.query
    enderecoRepo.getByIdProdutor(id_produtor)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const post = async (req, res) => {
    const { rua, numero, principal, id_produtor, id_municipio }= req.body
    console.log(req.body)
    enderecoRepo.post(rua, numero, id_municipio, principal, id_produtor)
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const put = async (req, res) => {
    const { id } = req.params
    const { rua, numero, id_municipio }= req.body
    enderecoRepo.put(id, rua, numero, id_municipio)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const deleteEndereco = async (req, res) => {
    const { id } = req.params
    enderecoRepo.deleteEndereco(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getAll,
    getByIdProdutor,
    post,
    put,
    deleteEndereco,
}