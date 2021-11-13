const especieRepo = require('../repo/especie')

const getEspecies = async (req, res) => {
    especieRepo.getEspecies()
        .then(response => res.json(response))
        .catch(err => res.send(err))
}

module.exports = {
    getEspecies,
}