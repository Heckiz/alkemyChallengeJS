const { Router } = require('express');
const router = Router();
const verifyToken= require('../helpers/verifyToken.js')


const { getMovements,
        newMovement,
        deleteMovement,
        updateMovement,
        getMovement
    } = require('../controllers/movements.controller.js')


router.route('/')
    .get(verifyToken, getMovements)
    .post(verifyToken, newMovement)

router.route('/:id')
    .get(verifyToken, getMovement)
    .delete(verifyToken, deleteMovement)
    .put(verifyToken, updateMovement)

module.exports = router;