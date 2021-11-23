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

module.exports = {
    getAll,
    getByIdProdutor,
}