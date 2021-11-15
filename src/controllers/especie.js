const especieRepo = require('../repo/especie')

const getEspecies = async (req, res) => {
    especieRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getEspecies,
}