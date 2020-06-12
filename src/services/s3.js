const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.IS_OFFLINE;
const CONFIG_PRODUCT_S3_ENDPOINT = process.env.CONFIG_S3_ENDPOINT;

let s3;

function s3Client() {
  if (s3) {
    return s3;
  }

  if (IS_OFFLINE === 'true') {
    s3 = new AWS.S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: CONFIG_PRODUCT_S3_ENDPOINT,
    });
  } else {
    s3 = new AWS.S3();
  }
  return s3;
}

module.exports = { s3Client };
