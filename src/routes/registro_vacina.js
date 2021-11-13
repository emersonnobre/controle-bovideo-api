const express = require('express')
const router = express.Router()
const { addRegistroVacina, deleteRegistroVacina, getRegistroVacina, } = require('../controllers/registro_vacina')

router.route('/vacina')
    .post(addRegistroVacina)

router.route('/vacina/:idRegistroVacina')
    .delete(deleteRegistroVacina)

router.route('/vacina/:inscricaoEstadual')
    .get(getRegistroVacina)

module.exports = router