const mongoose = require("mongoose");

module.exports = (config) => {
	const { connectionString, mongooseOptions } = config.mongoDb;

	return mongoose.connect(connectionString, mongooseOptions)
	.then((c) => {
		console.log('Connection with MongoDb established!');
	})
	.catch((err) => {
		console.error('Cannot connect to DB - ', err.stack);
		process.exit(1);
	});
};
