const express = require('express'); // web framework for node.js
const morgan = require('morgan'); // logs
const bodyParser = require('body-parser') // for parsing data

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes); // http://localhost:3000/products
app.use('/orders', orderRoutes); // http://localhost:3000/orders

// handle errors, for exsample, there are no route for http://localhost:3000 
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;