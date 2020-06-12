const { dynamoDbClient } = require('../services/dynamodb');

const CONFIG_PRODUCT_TABLE = process.env.CONFIG_PRODUCT_TABLE;

const dynamoDb = dynamoDbClient();

async function addProduct(req, res) {
  const dbParams = {
    TableName: CONFIG_PRODUCT_TABLE,
    Item: {
      id: '' + new Date().getTime(),
      ...req.body
    },
  };

  try {
    await dynamoDb.put(dbParams).promise();
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'error writing person' });
  }
}

module.exports = { addProduct };
