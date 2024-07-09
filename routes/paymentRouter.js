const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController')

// create order
paymentRouter.post('/createOrder', paymentController.createOrder)

// verify signature and do payment
paymentRouter.post("/success", paymentController.success);

paymentRouter.get("/search/:id", paymentController.search)

module.exports = paymentRouter;