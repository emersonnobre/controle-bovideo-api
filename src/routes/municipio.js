const express = require('express')
const router = express.Router()
const { getMunicipios } = require('../controllers/municipio')

router.route('/municipio').get(getMunicipios)

module.exports = router