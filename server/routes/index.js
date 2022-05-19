const router = require('express').Router();
const user = require('./user');
const auth = require('./auth');
const cart = require('./cart');
const order=require('./order')
const product=require('./product')

router.use('/users', user);
router.use('/auth', auth);
router.use('/cart', cart);
router.use('/order', order);
router.use('/products', product);

module.exports = router;
