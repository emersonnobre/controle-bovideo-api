const rebanhoRepo = require('../repo/rebanho')

const addRebanho = async (req, res) => {
    const { quantidade, id_especie, id_propriedade } = req.body
    if (!quantidade || !id_especie || !id_propriedade) return res.status(400).send('Informe os campos necessários')
    rebanhoRepo.save(id_propriedade, quantidade, id_especie)
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send(err))
}

const deleteRebanho = async (req, res) => {
    const { id } = req.params
    rebanhoRepo.remove(id)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err))
}

const getAnimaisByProdutor = async (req, res) => {
    const { cpf_produtor } = req.query
    rebanhoRepo.getByProdutor(cpf_produtor)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getAnimaisByPropriedade = async (req, res) => {
    const { inscricao_estadual_propriedade } = req.query
    rebanhoRepo.getByPropriedade(inscricao_estadual_propriedade)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    addRebanho,
    deleteRebanho,
    getAnimaisByProdutor,
    getAnimaisByPropriedade,
}