const receipts = require("../models/receipt.model");

class ReceiptService {

  async paginateReciepts(queryParams) {
      try {
        const options = Object.create(null);

        if (queryParams && queryParams.page) {
          options.page = parseInt(queryParams.page, 10);
        }

        if (queryParams && queryParams.limit) {
          options.limit = parseInt(queryParams.limit, 10);
        }
        
        // Sort by descending updated
        options.sort = {
          updatedAt: -1
        };

        const filter = Object.create(null);
        if(queryParams && queryParams.search) {
          filter.vehicleNumber = new RegExp(queryParams.search, 'i');
        }

        const reciepts = await receipts.paginate(filter, options);
        const recieptsResult = {
          itemCount: reciepts.docs.length,
          totalRecords: reciepts.total,
          pageCount: reciepts.page,
          sortBy: options.sort,
          docs: reciepts.docs
        };
      
        return recieptsResult;
      } catch (err) {
        console.error('Paginate reciepts failed - ', err.message);
        throw err;
      }
  }

  async addNewPass(requestData) {
    try {
      return await receipts.create(requestData);
    } catch(err) {
      console.error('Create pass failed - ', err.message);
      throw err;
    }
  }
  
  async validateReceipt(requestData) {
    try {
      if(!requestData || !requestData.length) {
        throw new Error('Invalid id!');
      }
      const findReceipt = await receipts.findOne({_id:requestData}, {});
      var present = new Date();
      if(findReceipt.entryDate.getDate()!=present.getDate()) {
        return {
          isValid : false
        }
      }
      if(findReceipt.cost > 100) {
        return {
          isValid : true
        }
      } else {
        return {
          isValid : false
        }
      }
    } catch(err) {
      console.error('Validation failed - ', err.message);
      throw err;
    }
  }
}

module.exports = new ReceiptService();
