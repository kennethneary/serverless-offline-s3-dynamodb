const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.IS_OFFLINE;
const CONFIG_PRODUCT_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT;

let dynamoDb;

function dynamoDbClient() {
  if (dynamoDb) {
    return dynamoDb;
  }

  if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: CONFIG_PRODUCT_DYNAMODB_ENDPOINT,
    });
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
  }
  return dynamoDb;
}

module.exports = { dynamoDbClient };
