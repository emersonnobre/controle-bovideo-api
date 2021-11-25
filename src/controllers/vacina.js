const vacinaRepo = require('../repo/vacina')

const getVacinas = async (req, res) => {
    vacinaRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err)) 
}

const get = async (req, res) => {
    const { id } = req.params
    vacinaRepo.get(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err)) 
}

module.exports = {
    getVacinas,
    get,
}