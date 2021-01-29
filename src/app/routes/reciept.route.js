const express = require('express');
const receiptController = require('../controllers/receipt.controller');

const router = express.Router();

router.get('/', (req, res) => receiptController.showReceipts(req, res));
router.post('/', (req, res) => receiptController.addNewPass(req, res));
router.get('/validate', (req, res) => receiptController.validateReceipt(req, res));

module.exports = router;