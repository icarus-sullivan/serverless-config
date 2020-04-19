const AWS = require('aws-sdk');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const DEFAULT_KEY = 'config.json';

const getJSON = async ({ bucket, key }) => {
  try {
    const { Body } = await s3
      .getObject({
        Bucket: bucket,
        Key: key || DEFAULT_KEY,
      })
      .promise();
    return Buffer.from(Body).toString('utf8');
  } catch (e) {
    console.error(e.message);
    return {};
  }
};

module.exports = {
  getJSON,
};
