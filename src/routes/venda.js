const express = require('express')
const router = express.Router()
const { addVenda, deleteVenda, getVendaByProdutor, getCompraByProdutor, getAll, getById } = require('../controllers/venda')

router.route('/venda')
    .get((req, res) => {
        if (req.query.cpf) return getVendaByProdutor(req, res)
        else if (req.query.id) return getById(req, res)
        return getAll(req, res)
    })
    .post(addVenda)

router.route('/venda/:id')
    .delete(deleteVenda)

router.route('/compra/:cpf')
    .get(getCompraByProdutor)

module.exports = router