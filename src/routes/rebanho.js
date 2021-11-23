const express = require('express')
const router = express.Router()
const { addRebanho, deleteRebanho, getAnimaisByProdutor, getAnimaisByPropriedade, getAll } = require('../controllers/rebanho')
    
router.route('/rebanho')
    .post(addRebanho)
    .get((req, res, next) => {
        if (req.query.cpf_produtor) {
            getAnimaisByProdutor(req, res, next)
        } else if (req.query.inscricao_estadual_propriedade) {
            getAnimaisByPropriedade(req, res, next)
        } else {
            getAll(req, res)
        }
    })

router.route('/rebanho/:id')
    .delete(deleteRebanho)

module.exports = router