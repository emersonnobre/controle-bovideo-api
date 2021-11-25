const express = require('express')
const router = express.Router()
const { getVacinas, get } = require('../controllers/vacina')

router.route('/vacina/tipo')
    .get(getVacinas)

router.route('/vacina/tipo/:id')
    .get(get)

module.exports = router