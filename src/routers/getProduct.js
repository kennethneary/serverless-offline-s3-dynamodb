const { dynamoDbClient } = require('../services/dynamodb');

const CONFIG_PRODUCT_TABLE = process.env.CONFIG_PRODUCT_TABLE;

const dynamoDb = dynamoDbClient();

async function getProduct(req, res) {
  const dbParams = {
    TableName: CONFIG_PRODUCT_TABLE,
  };

  const result = await dynamoDb.scan(dbParams).promise();
  res.status(200).json({ persons: result.Items });
}

module.exports = { getProduct };
