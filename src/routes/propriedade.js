const express = require('express')
const router = express.Router()
const { getPropriedades, getPropriedadeInscricao, getPropriedadeProdutor, addPropriedade, updatePropriedade } = require('../controllers/propriedade')

router.route('/propriedade')
    .get(getPropriedades)
    .post(addPropriedade)

router.route('/propriedade/:inscricaoEstadual')
    .get(getPropriedadeInscricao)
    .patch(updatePropriedade)

router.route('/propriedade/produtor/:idProdutor')
    .get(getPropriedadeProdutor)

module.exports = router