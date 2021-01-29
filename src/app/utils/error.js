const convertErrorToObject = (err) => {
    /*
        Iterate over non-enumerable properties of error object and get
        javascript error object for further use
    */
    return Object.getOwnPropertyNames(err).reduce((acc, curr) => {
        acc[curr] = err[curr];
        return acc;
    }, Object.create(null));
};

module.exports = {
    convertErrorToObject
};