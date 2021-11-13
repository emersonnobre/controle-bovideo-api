const express = require('express')
const router = express.Router()
const { addRebanho, deleteRebanho, getAnimaisByProdutor, getAnimaisByPropriedade, } = require('../controllers/rebanho')
    
router.route('/rebanho')
    .post(addRebanho)
    .get((req, res, next) => {
        if (req.query.cpfProdutor) {
            getAnimaisByProdutor(req, res, next)
        } else if (req.query.inscricaoEstadualPropriedade) {
            getAnimaisByPropriedade(req, res, next)
        } else {
            res.status(404).end()
        }
    })

router.route('/rebanho/:id')
    .delete(deleteRebanho)

module.exports = router