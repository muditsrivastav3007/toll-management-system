const HttpStatus = require('http-status-codes');

function responseMapper(status, customMessage, customData) {
    const response = {};
    if (customMessage) {
      response.status = status;
      response.message = customMessage;
      response.data = customData;
    } else {
      response.status = status;
      response.message = HttpStatus.getStatusText(status);
      response.data = customData;
    }
    
    return response;
}

module.exports = responseMapper;