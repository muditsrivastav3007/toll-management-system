const { StatusCodes } = require('http-status-codes');
const recieptService = require('../services/receipt.service');
const { convertErrorToObject } = require('../utils/error');

class ReceiptController {

  async showReceipts(req, res) {
    try {
      const reciepts = await recieptService.paginateReciepts(req.query);
      return res.status(StatusCodes.OK).json(reciepts);
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json(convertErrorToObject(err));
    }
  }

  async addNewPass(req, res) {
    try {
      const data = JSON.parse(Object.keys(JSON.parse(JSON.stringify(req.body)))[0]);
      const newPass = await recieptService.addNewPass(data);
      return res.status(StatusCodes.CREATED).json(newPass);
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).json(convertErrorToObject(err));
    }
  }

  async validateReceipt(req, res) {
    try {
      var data = Object.keys(JSON.parse(JSON.stringify(req.query)))[0];
      const resp = await recieptService.validateReceipt(data);
      return res.status(StatusCodes.OK).json(resp);
    } catch(err) {
      return res.status(StatusCodes.BAD_REQUEST).json(convertErrorToObject(err));
    }
  }
}

module.exports = new ReceiptController();
