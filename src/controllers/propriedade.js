const propriedadeRepo = require('../repo/propriedade')

const getPropriedades = async (req, res, next) => {
    propriedadeRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getPropriedadeInscricao = async (req, res, next) => {
    const { inscricaoEstadual } = req.params
    propriedadeRepo.getByInscricao(inscricaoEstadual)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getPropriedadeProdutor = async (req, res, next) => {
    const { idProdutor } = req.params
    propriedadeRepo.getByProdutor(idProdutor)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const addPropriedade = async (req, res, next) => {
    const { inscricaoEstadual, nome, idMunicipio, idProdutor } = req.body
    if (!nome || !inscricaoEstadual || !idMunicipio || !idProdutor) return res.status(400).send('Informe os campos necessários')
    propriedadeRepo.save({nome, inscricaoEstadual, idMunicipio, idProdutor})
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send(err))
}

const updatePropriedade = async (req, res, next) => {
    const { inscricaoEstadual, nome, idMunicipio, idProdutor } = req.body
    if (!nome || !inscricaoEstadual || !idMunicipio || !idProdutor) return res.status(400).send('Informe os campos necessários').end()
    propriedadeRepo.update({nome, inscricaoEstadual, idMunicipio, idProdutor})
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getPropriedades,
    getPropriedadeInscricao,
    getPropriedadeProdutor,
    addPropriedade,
    updatePropriedade,
}