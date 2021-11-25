const express = require('express')
const router = express.Router()
const { getMunicipios, get } = require('../controllers/municipio')

router.route('/municipio')
    .get(getMunicipios)

router.route('/municipio/:id')
    .get(get)

module.exports = router