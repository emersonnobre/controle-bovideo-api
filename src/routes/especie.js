const express = require('express')
const router = express.Router()
const { getEspecies, get } = require('../controllers/especie')

router.route('/especie').get(getEspecies)

router.route('/especie/:id')
    .get(get)

module.exports = router