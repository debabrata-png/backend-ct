const multer=require('multer');
const aws=require('aws-sdk');
const multerS3=require('multer-s3');
aws.config.update({
  accessKey: process.env.AWS_ACCESS_KEY_ID, // 'AKIAUAC655EBDFT6YKIL',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // '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',
  region: 'us-east-2'
});

const s3=new aws.S3({});

exports.upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'campustech1',
      key: function (req, file, cb) {
          //console.log(file);
          cb(null, Date.now().toString() + '-' + file.originalname); //use Date.now() for unique file keys
      }
  })
});