const dbConnection = require('../database/connection')
const vendaRepo = require('../repo/venda')
const { getProdutorByPropriedade } = require('../repo/produtor')

const addVenda = async (req, res) => {
    vendaRepo.save(req.body)
        .then(() => res.status(201).send('Venda inserida').end())
        .catch(console.log)
}

const deleteVenda = async (req, res) => {
    const { id } = req.params
    vendaRepo.remove(id)
        .then(response => res.send(response).end())
        .catch(console.log)
}

const getVendaByProdutor = async (req, res) => {
    const { cpf } = req.params
    vendaRepo.getVendasByProdutor(cpf)
        .then(response => res.json(response).end())
        .catch(console.log)
}

const getCompraByProdutor = async (req, res) => {
    const { cpf } = req.params 
    vendaRepo.getComprasByProdutor(cpf)
        .then(response => res.send(response).end())
}

module.exports = {
    addVenda,
    deleteVenda,
    getVendaByProdutor,
    getCompraByProdutor,
}