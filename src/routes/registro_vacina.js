const express = require('express')
const router = express.Router()
const { addRegistroVacina, deleteRegistroVacina, getRegistroVacina, } = require('../controllers/registro_vacina')

router.route('/vacina')
    .post(addRegistroVacina)

router.route('/vacina/:id_registro_vacina')
    .delete(deleteRegistroVacina)

router.route('/vacina/:inscricao_estadual')
    .get(getRegistroVacina)

module.exports = router