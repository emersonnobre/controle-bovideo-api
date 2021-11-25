const express = require('express')
const router = express.Router()
const { addRegistroVacina, deleteRegistroVacina, getByPropriedade, getAll, getById, } = require('../controllers/registro_vacina')

router.route('/vacina')
    .get((req, res) => {
        if (req.query.inscricao_estadual) return getByPropriedade(req, res)
        else if (req.query.id) return getById(req, res)
        else getAll(req, res)
    })
    .post(addRegistroVacina)

router.route('/vacina/:id_registro_vacina')
    .delete(deleteRegistroVacina)

module.exports = router