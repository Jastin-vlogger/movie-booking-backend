// const { PutObjectCommand, S3Client } =require("@aws-sdk/client-s3") ;
// const { v4: uuidv4 } =require("uuid") ;

// // AWS.config.update({region:'us-east-1'});

// const s3 = new S3Client();
// const BUCKET = process.env.BUCKET;

// const uploadToS3 = async ({ file, id }) => {
//     const key = `${id}/${uuidv4()}`;
//     const command = new PutObjectCommand({
//       Bucket:BUCKET,
//       Key:key,
//       Body:file.buffer,
//       ContentType:file.mimetype,
//       Region:process.env.REGION
//     });
  
//     try {
//       await s3.send(command);
//       return { key };
//     } catch (error) {
//       console.log(error);
//       return { error };
//     }
//   };

//   module.exports = {
//     uploadToS3
//   }



require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream