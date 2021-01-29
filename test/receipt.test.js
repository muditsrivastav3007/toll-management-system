const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const receiptService = require('../src/app/services/receipt.service');
const receiptModel = require('../src/app/models/receipt.model');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});


describe('receipt create ', () => {
    
    it('can be created correctly', async () => {
        expect(async () => {
            await receiptService.addNewPass(receipt);
        })
        .not
        .toThrow();
    });

    
    it('exists after being created', async () => {
        const resp = await receiptService.addNewPass(receipt1);

        const createdProduct = await receiptModel.findOne({_id:resp._id});

        expect(createdProduct.vehicleNumber)
        .toBe(resp.vehicleNumber);
    });

    
    it('requires cost', async () => {
        await expect(receiptService.addNewPass(receipt2))
        .rejects
        .toThrow(mongoose.Error.ValidationError);

    });
});

describe('validate receipt', () => {
    it('successful', async () => {
        const resp = await receiptService.addNewPass(receipt1);
        const validationResult = await receiptService.validateReceipt(resp._id.toString());
        const expectedResult = {
            isValid : true
        };
        expect(validationResult.isValid)
        .toBe(expectedResult.isValid);
    });
    it('unsuccessful', async () => {
        const resp = await receiptService.addNewPass(receipt);
        const validationResult = await receiptService.validateReceipt(resp._id.toString());
        const expectedResult = {
            isValid : false
        };
        expect(validationResult.isValid)
        .toBe(expectedResult.isValid);
    });
});

const receipt = {
    "vehicleNumber" : "98760",
    "entryDate" : new Date("2021-01-28T14:32:00.000Z"),
    "cost" : 167,
};

const receipt1 = {
    "vehicleNumber" : "987600",
    "entryDate" : new Date("2021-01-29T14:32:00.000Z"),
    "cost" : 607,
};

const receipt2 = {
    "vehicleNumber" : "9876000",
    "entryDate" : new Date("2021-01-01T14:32:00.000Z")
};
