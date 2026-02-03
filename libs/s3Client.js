const {S3Client} = require("@aws-sdk/client-s3");


const REGION = "eu-central-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

module.exports = s3Client;