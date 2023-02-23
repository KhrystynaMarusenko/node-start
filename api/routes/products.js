const express = require('express');
const router = express.Router();

//RESTful api

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'hedling get for /products'
    });
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'hedling post  for /products'
    });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message: 'hedling get product with special id for /products',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'hedling get product with id for /products',
        });
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated product for /products',
    });
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted product for /products',
    });
})

module.exports = router;