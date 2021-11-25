const express = require('express')
const router = express.Router()
const { getProdutores, getProdutorByCpf, getProdutorById, addProdutor, updateProdutor } = require('../controllers/produtor')

router.route('/produtor')
    .get((req, res) => {
        if (req.query.id) return getProdutorById(req, res)
        if (req.query.cpf) return getProdutorByCpf(req, res)
        getProdutores(req, res)
    })
    .post(addProdutor)

router.route('/produtor/:id')
    .put(updateProdutor)
    
module.exports = router