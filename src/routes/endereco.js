const express = require('express')
const router = express.Router()
const { getAll, getByIdProdutor, post, put, deleteEndereco } = require('../controllers/endereco')

router.route('/endereco')
    .get((req, res) => {
        if (req.query.id_produtor) return getByIdProdutor(req, res)
        else getAll(req, res)
    })
    .post(post)

router.route('/endereco/:id')
    .put(put)
    .delete(deleteEndereco)

module.exports = router