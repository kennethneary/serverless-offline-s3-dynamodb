const sharp = require('sharp');
const path = require('path');

const { s3Client } = require('../services/s3');

const CONFIG_PRODUCT_BUCKET = process.env.CONFIG_PRODUCT_BUCKET;

const s3 = s3Client();

const webhook = async (event) => {
  const s3Params = {
    Bucket: CONFIG_PRODUCT_BUCKET,
    Key: '1234',
    Body: new Buffer('abcd')
  };

  await s3.putObject(s3Params).promise();
  return {};
};
 
const s3hook = (event, context) => {
  console.log('s3hook:');
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
};

const imageS3hook = async (event) => {
  console.log('imageS3hook:');
  const received_key = event.Records[0].s3.object.key;
  const get_param = {
      Bucket: CONFIG_PRODUCT_BUCKET,
      Key: received_key,
  };
  const filename = path.basename(received_key);
  console.log('imageS3hook 1:');

  const data = await s3.getObject(get_param).promise();

  console.log('imageS3hook 2:');

  console.log('data:', data);


  // resize images
  const processedData = await sharp(data.Body).resize(320).toBuffer();
  console.log('processedData:');

  const put_param = {
      Bucket: CONFIG_PRODUCT_BUCKET,
      Key: `processed/${filename}`,
      Body: processedData,
  };
  console.log('imageS3hook 3:');

  return await s3.putObject(put_param).promise();
};


module.exports = {
    webhook,
    s3hook,
    imageS3hook
}