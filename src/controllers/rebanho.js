const rebanhoRepo = require('../repo/rebanho')

const addRebanho = async (req, res) => {
    const { quantidade, id_especie, id_propriedade } = req.body
    if (!quantidade || !id_especie || !id_propriedade) return res.status(400).send('Informe os campos necessários')
    rebanhoRepo.saveEntradaAnimal(quantidade, id_propriedade, id_especie)
        .then(response => res.status(201).json(response))
        .catch(console.log)
}

const deleteRebanho = async (req, res) => {
    const { id } = req.params
    rebanhoRepo.removeEntradaAnimal(id)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err))
}

const getAnimaisByProdutor = async (req, res) => {
    const { cpf_produtor } = req.query
    console.log(cpf_produtor)
    rebanhoRepo.getByProdutor(cpf_produtor)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getAnimaisByPropriedade = async (req, res) => {
    const { inscricao_estadual_propriedade } = req.query
    rebanhoRepo.getByPropriedade(inscricao_estadual_propriedade)
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getAll = async (req, res) => {
    rebanhoRepo.getAll()
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getAllVacinados = async (req, res) => {
    rebanhoRepo.getAllVacinados()
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

const getAllEntradas = async (req, res) => {
    rebanhoRepo.getAllEntradas()
        .then(response => res.json(response))
        .catch(err => console.log(err))
}

module.exports = {
    addRebanho,
    deleteRebanho,
    getAll,
    getAllVacinados,
    getAllEntradas,
    getAnimaisByProdutor,
    getAnimaisByPropriedade,
}