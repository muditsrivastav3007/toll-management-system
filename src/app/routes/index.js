const express = require('express');
const router = express.Router();
router.use('/pass', require('./reciept.route'));
module.exports = router;
