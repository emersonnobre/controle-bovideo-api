const registroVacinaRepo = require('../repo/registro_vacina')
const registroVacinaDomain = require('../domain/registro_vacina')

const addRegistroVacina = async (req, res) => {
    const { quantidade, data_vacina, id_vacina, id_propriedade, id_especie } = req.body
    console.log(req.body)
    if (!quantidade || !data_vacina || !id_vacina || !id_propriedade || !id_especie) return res.status(400).send('Informe os campos necessários')
    const registro = registroVacinaDomain.create(quantidade, data_vacina, id_vacina, id_propriedade, id_especie)
    console.log('registro: ', registro)
    const valid = await registro.valid()
    if (valid.valid === false) return res.status(400).send(valid.msg)
    registroVacinaRepo.save(Number(quantidade), id_propriedade, id_especie, id_vacina, data_vacina)
        .then(response => res.status(201).json(response))
        .catch(err => console.log(err)) 
}

const deleteRegistroVacina = async (req, res) => {
    const { id_registro_vacina } = req.params
    registroVacinaRepo.remove(id_registro_vacina)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err))
}

const getByPropriedade = async (req, res, next) => {
    const { inscricao_estadual } = req.query
    registroVacinaRepo.getByPropriedade(inscricao_estadual)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getById = async (req, res, next) => {
    const { id } = req.query
    registroVacinaRepo.getById(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

const getAll = async (req, res) => {
    registroVacinaRepo.getAll()
        .then(response => res.json(response))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    addRegistroVacina,
    deleteRegistroVacina,
    getByPropriedade,
    getById,
    getAll,
}