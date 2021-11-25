const express = require('express')
const router = express.Router()
const { addRebanho, deleteRebanho, getAnimaisByProdutor, getAnimaisByPropriedade, getAll, getAllVacinados, getAllEntradas } = require('../controllers/rebanho')
    
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

router.route('/rebanho/entrada/:id')
    .delete(deleteRebanho)

router.route('/rebanho/vacinados')
    .get(getAllVacinados)

router.route('/rebanho/entradas')
    .get(getAllEntradas)

module.exports = router