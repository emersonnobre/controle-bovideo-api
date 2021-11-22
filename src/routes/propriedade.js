const express = require('express')
const router = express.Router()
const { getPropriedades, getPropriedadeInscricao, getPropriedadeProdutor, addPropriedade, updatePropriedade } = require('../controllers/propriedade')

router.route('/propriedade')
    .get(getPropriedades)
    .post(addPropriedade)

    router.route('/propriedade/:inscricao_estadual')
    .get(getPropriedadeInscricao)
    .patch(updatePropriedade)
    

router.route('/propriedade/produtor/:id_produtor')
    .get(getPropriedadeProdutor)

module.exports = router