const express = require('express')
const router = express.Router()
const { addVenda, deleteVenda, getVendaByProdutor, getCompraByProdutor, } = require('../controllers/venda')

router.route('/venda')
    .post(addVenda)

router.route('/venda/:id')
    .delete(deleteVenda)

router.route('/venda/:cpf')
    .get(getVendaByProdutor)

router.route('/compra/:cpf')
    .get(getCompraByProdutor)

module.exports = router