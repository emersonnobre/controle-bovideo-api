const vendaRepo = require('../repo/venda')
const vendaDomain = require('../domain/venda')

const addVenda = async (req, res) => {
    const { quantidade, id_propriedade_destino, id_propriedade_origem, id_especie, motivo } = req.body
    if (!quantidade || !id_propriedade_destino || !id_propriedade_origem || !id_especie || !motivo) return res.status(400).send('Informe os campos necessários')
    console.log(req.body)
    const venda = vendaDomain.create(quantidade, id_propriedade_destino, id_propriedade_origem, id_especie, motivo)
    const valid = await venda.valid()
    console.log(valid)
    if (valid.valid === false) return res.status(400).send(valid.msg)
    vendaRepo.save(quantidade, id_propriedade_destino, id_propriedade_origem, id_especie, motivo)
        .then(response => res.status(201).json(response))
        .catch(err => console.log(err))  
}

const deleteVenda = async (req, res) => {
    const { id } = req.params
    vendaRepo.remove(id)
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))
}

const getAll = async (req, res) => {
    vendaRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getVendaByProdutor = async (req, res) => {
    const { cpf } = req.query
    vendaRepo.getVendasByProdutor(cpf)
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getCompraByProdutor = async (req, res) => {
    const { cpf } = req.params 
    vendaRepo.getComprasByProdutor(cpf)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getById = async (req, res) => {
    const { id } = req.query 
    vendaRepo.getById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    addVenda,
    deleteVenda,
    getAll,
    getVendaByProdutor,
    getCompraByProdutor,
    getById,
}