const AWS = require('aws-sdk');
const { pipe } = require('@sullux/fp-light');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const DEFAULT_KEY = 'config.json';

const extractParams = ({ queryStringParameters = {} }) => ({
  Bucket: process.env.BUCKET_NAME,
  Key: queryStringParameters.key || DEFAULT_KEY,
});

const fetchConfig = async (params) => s3.getObject(params).promise();

const parseResponse = ({ Body }) => Buffer.from(Body).toString('utf8');

const formatResponse = (json) => ({
  statusCode: '200',
  body: json,
});

module.exports.default = pipe(
  extractParams,
  fetchConfig,
  parseResponse,
  formatResponse,
);
