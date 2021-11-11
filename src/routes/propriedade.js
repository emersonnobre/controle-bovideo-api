const express = require('express')
const router = express.Router()

router.route('/propriedade')
    .get((req, res, next) => res.send('get all'))
    .post((req, res, next) => res.json(req.body))

router.route('/propriedade/:id')
    .get((req, res, next) => res.send(`get one: ${req.params.id}`))
    .patch((req, res, next) => res.send(`update one: ${req.params.id}`))
    .delete((req, res, next) => res.send(`delete one: ${req.params.id}`))

module.exports = router