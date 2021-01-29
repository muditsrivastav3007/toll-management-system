var receiptService = {
    addNewPass : function(params, successCb, errorCb) {
        $.post('/api/v1/pass',
            params
        )
        .done(successCb)
        .fail(errorCb);
    },

    showReceipts : function(params, successCb, errorCb) {
        $.get('/api/v1/pass',
            params
        )
        .done(successCb)
        .fail(errorCb);
    },

    validateReceipt : function(params, successCb, errorCb) {
        $.get('/api/v1/pass/validate',
            params
        )
        .done(successCb)
        .fail(errorCb);
    },
}

var apiServices = {
    receiptService ,
}