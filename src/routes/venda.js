const express = require('express')
const router = express.Router()

router.route('/venda')
    .post((req, res, next) => res.send(req.body).status(201))

router.route('/venda/:id')
    .delete((req, res, next) => res.send(`delete one: ${req.params.id}`))

router.route('/venda/:idprodutor')
    .get((req, res, next) => res.send(req.baseUrl))

router.route('/compra/:idprodutor')
    .get((req, res, next) => res.send(`get purchase from a productor: ${req.params.idprodutor}`))

module.exports = router