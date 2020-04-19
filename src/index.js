const { wrapper } = require('@teleology/lambda-api');
const { getJSON } = require('../utils/s3');

const getConfig = async ({ data = {} }) =>
  getJSON({
    bucket: process.env.BUCKET_NAME,
    key: data.key,
  });

module.exports.default = wrapper(getConfig);
