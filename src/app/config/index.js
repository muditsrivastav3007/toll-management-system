const path = require("path");
const dotenv = require("dotenv");


const dotEnvOptions = {
    path: path.join(__dirname, '..', '.env')
};
dotenv.config(dotEnvOptions);

const configuration = {
    mongoDb: {
        connectionString: process.env.DB_MONGO,
        mongooseOptions: {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
            connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT)
        }
    },
    port: parseInt(process.env.PORT || 3000),
    sessionSecret: process.env.SESSION_SECRET
};

module.exports = configuration;
