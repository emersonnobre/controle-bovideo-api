const express = require('express')
const router = express.Router()
    
router.route('/animais')
    .post((req, res, next) => res.send(req.body).status(201))
    .get((req, res) => {
        if (req.query.cpf) {
            return res.send(`animal -> cpf ${req.query.cpf}`)
        } else if (req.query.inscricao_municipal) {
            return res.send(`animal -> inscricao municipal ${req.query.inscricao_municipal}`)
        } else {
            res.status(404).end()
        }
    })

router.route('/animais/:id')
    .delete((req, res, next) => res.send(`delete one: ${req.params.id}`))

module.exports = router