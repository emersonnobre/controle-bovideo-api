const propriedadeRepo = require('../repo/propriedade')
const propriedadeDomain = require('../domain/propriedade')

const getPropriedades = async (req, res) => {
    propriedadeRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getPropriedadeInscricao = async (req, res) => {
    const { inscricao_estadual } = req.params
    propriedadeRepo.getByInscricao(inscricao_estadual)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getPropriedadeProdutor = async (req, res) => {
    const { id_produtor } = req.params
    propriedadeRepo.getByProdutor(id_produtor)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const addPropriedade = async (req, res) => {
    const { inscricao_estadual, nome, id_municipio, id_produtor } = req.body
    if (!nome || !inscricao_estadual || !id_municipio || !id_produtor) return res.status(400).send('Informe os campos necessários')
    const propriedade = propriedadeDomain.create(nome, inscricao_estadual, id_municipio, id_produtor)
    const valid = await propriedade.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    propriedadeRepo.save(nome, inscricao_estadual, id_municipio, id_produtor)
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send(err))
}

const updatePropriedade = async (req, res, next) => {
    const { inscricao_estadual, nome, id_municipio, id_produtor } = req.body
    if (!nome || !inscricao_estadual || !id_municipio || !id_produtor) return res.status(400).send('Informe os campos necessários')
    const propriedade = propriedadeDomain.create(nome, inscricao_estadual, id_municipio, id_produtor)
    const valid = await propriedade.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    propriedadeRepo.update(nome, inscricao_estadual, id_municipio, id_produtor)
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