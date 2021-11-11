const express = require('express')
const router = express.Router()

router.route('/vacina')
    .post((req, res, next) => res.send(req.body).status(201))

router.route('/vacina/:id')
    .delete((req, res, next) => res.send(`delete a vacine: ${req.params.id}`))

router.route('/vacina/:inscricao_municipal')
    .get((req, res, next) => res.send(`get one ${req.params.inscricao_municipal}`))

module.exports = router