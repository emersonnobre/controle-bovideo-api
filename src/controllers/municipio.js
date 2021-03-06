const municipioRepo = require('../repo/municipio')

const getMunicipios = async (req, res) => {
    municipioRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err)) 
}

const get = async (req, res) => {
    const { id } = req.params
    municipioRepo.get(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err)) 
}

module.exports = {
    getMunicipios,
    get,
}