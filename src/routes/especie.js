const express = require('express')
const router = express.Router()
const { getEspecies } = require('../controllers/especie')

router.route('/especie').get(getEspecies)

module.exports = router