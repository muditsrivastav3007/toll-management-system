# Toll Management System

### User journey
1. Viewing all the exisitng receipts and validate them 
2. Add a new receipt

### How To Run?

To run this website run this command on command prompt on root folder.

```
npm start or node index.js
```
There is only 1 entity receipt(model) for DB
<h4><b>Receipt Schema</b></h4>

| Name          | Type   |
| ------------- | ------ |
| vehicleNumber | String |
| entryDate     | Date   |
| cost          | Number |

<h4><b>API's used</b></h4>

1. showReceipts
Route - /api/v1/pass
HTTP Verb - GET
Returns 200 with array of receipts in json

2. addNewPass
Route - /api/v1/pass
HTTP Verb - POST
PARAMS(Body) - receipt object
Returns 201 with the receipt object created in json

3. validateReceipt
Route - /api/v1/pass/validate
HTTP Verb - GET
PARAMS(Body) - _id of receipt which is to be validated
Returns 200 with boolean value in the json object

<h4><b>Test-Cases</b></h4>

1. <h5><b>addNewPass API</b></h5>

- creating a receipt with a valid object(positive)
- creating a receipt with a invalid object with cost missing(negative)
- creating a receipt and then checking if it exists or not

2. <h5><b>validateReceipt API</b></h5>

- validating a valid receipt(positive)
- validating a invalid receipt(negtive)

<h4><b>Tech-stack</b></h4>

- NodeJS
- MongoDB
- ejs, bootstrap

<h5><b>this small app is containerized through Docker as well</b></h5>