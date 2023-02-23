const express = require('express');
const router = express.Router();

//RESTful api

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'hedling get for /orders'
    });
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity,
    }
    res.status(201).json({
        message: 'hedling post  for /orders',
        order: order
    });
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'hedling get with ID for /orders',
        orderId: req.params.orderId,
    });
})


router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted order for /orders',
    });
})

module.exports = router;