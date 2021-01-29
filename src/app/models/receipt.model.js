const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const receiptSchema = new mongoose.Schema({
	vehicleNumber : {
		type: String,
		required: true
	},
	entryDate : {
		type: Date,
		required: true
	},
	cost : {
		type: Number,
		required: true
	}
}, {
	timestamps: true,
	versionKey: false
});

receiptSchema.plugin(mongoosePaginate);

module.exports =  mongoose.model('receipts', receiptSchema, 'reciepts');
