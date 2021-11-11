const { application } = require('express')
const express = require('express')
const router = express.Router()
const { getProdutores, getProdutor, addProdutor, updateProdutor } = require('../controllers/produtor')

router.route('/produtor')
    .get(getProdutores)
    .post(addProdutor)

router.route('/produtor/:id')
    .patch(updateProdutor)

router.route('/produtor/:cpf')
    .get(getProdutor)
    
module.exports = router