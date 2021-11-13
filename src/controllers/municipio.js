const municipioRepo = require('../repo/municipio')

const getMunicipios = async (req, res) => {
    municipioRepo.getMunicipios()
        .then(response => res.json(response))
        .catch(err => res.send(err)) 
}

module.exports = {
    getMunicipios
}