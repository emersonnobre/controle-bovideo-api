const express = require('express')
const router = express.Router()
const { getAll, getByIdProdutor, } = require('../controllers/endereco')

router.route('/endereco')
    .get((req, res) => {
        if (req.query.id_produtor) return getByIdProdutor(req, res)
        else getAll(req, res)
    })

module.exports = router