const rebanhoRepo = require('../repo/rebanho')

const addRebanho = async (req, res, next) => {
    const { quantidade, idEspecie, idPropriedade } = req.body
    if (!quantidade || !idEspecie || !idPropriedade) return res.status(400).send('Informe os campos necessários').end()
    rebanhoRepo.addRebanho({quantidade, idEspecie, idPropriedade})
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

const deleteRebanho = async (req, res, next) => {
    const { id } = req.params
    rebanhoRepo.deleteRebanho(id)
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

const getAnimaisByProdutor = async (req, res, next) => {
    const { cpfProdutor } = req.query
    rebanhoRepo.getAnimaisByProdutor(cpfProdutor)
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

const getAnimaisByPropriedade = async (req, res, next) => {
    const { inscricaoEstadualPropriedade } = req.query
    rebanhoRepo.getAnimaisByPropriedade(inscricaoEstadualPropriedade)
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

module.exports = {
    addRebanho,
    deleteRebanho,
    getAnimaisByProdutor,
    getAnimaisByPropriedade,
}