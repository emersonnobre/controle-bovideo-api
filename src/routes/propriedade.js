const express = require('express')
const router = express.Router()
const { getPropriedades, getPropriedadeInscricao, getPropriedadeProdutor, addPropriedade, updatePropriedade, getById } = require('../controllers/propriedade')

router.route('/propriedade')
    .get((req, res) => {
        if (req.query.id) return getById(req, res)
        if (req.query.inscricao_estadual) return getPropriedadeInscricao(req, res)
        if (req.query.id_produtor) return getPropriedadeProdutor(req, res)
        else getPropriedades(req, res)
    })
    .post(addPropriedade)

router.route('/propriedade/:inscricao_estadual')
    .put(updatePropriedade)

module.exports = router