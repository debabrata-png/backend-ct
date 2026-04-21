const multer=require('multer');
const aws=require('aws-sdk');
const multerS3=require('multer-s3');

const Awsconfig=require('./../Models/awsconfig');
const Supportingdoc=require('./../Models/supportingdoc');







const s3=new aws.S3({});

// exports.upload = multer({
//   storage: multerS3({
//       acl: "public-read",
//       s3: s3,
//       bucket: 'campustech1',
//       key: function (req, file, cb) {
//           //console.log(file);
//           cb(null, Date.now().toString() + '-' + file.originalname); //use Date.now() for unique file keys
//       }
//   })
// });

exports.uploadsupportingdoc =async function(req, res) {
    //console.log('processing file upload');

    const lcat1233= await Awsconfig.find()
    .where('colid')
    .equals(req.body.colid)
    .where('type')
    .equals('aws');

    var bucket;
    var username;
    var password;
    var region;

    lcat1233.forEach(function(data){
        //console.log(data.link);
        username=data.username;
        password=data.password;
        bucket=data.bucket;
        region=data.region;
        

    })

    aws.config.update({
        accessKey: username, // 'AKIAUAC655EBDFT6YKIL',
        secretAccessKey: password, // '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',
        region: region
      });

      var upload = multer({
        storage: multerS3({
            acl: "public-read",
            s3: s3,
            bucket: bucket,
            key: function (req, file, cb) {
                //console.log(file);
                cb(null, Date.now().toString() + '-' + file.originalname); //use Date.now() for unique file keys
            }
        })
      });
   
    
    upload(req,res,function(err) {
        if(err) {
            //console.log("Error uploading file." + err.toString());
            return res.end("Error uploading file." + err.toString());
        }
        const name=req.body.name;
        const colid=req.body.colid;
        //console.log('files ' + req.files);
        const user1=req.body.user;
        const token=req.body.token;
        const criteria=req.body.criteria;
        const metric=req.bodt.metric;
        const field1=req.body.field1;
        const type=req.body.type;
        const collection=req.body.collection;
        
        //console.log('token ' + token);
        let jwtuser='';
        let jwtcolid='';
        try {
            const verified = jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err123, verified) => {
                  if (err123) {
                    return res.status(401).json({
                        status: 'Unauthorized',
                        error: err123
                    });
                  }
                  jwtuser=verified.user;
                  jwtcolid=verified.colid;
                  return verified;
                }
              );
              //console.log(verified);
    
        } catch(err1234) {
            //console.log(err1234);
        }
        //console.log('token verified ' + jwtuser + '-' + jwtcolid);

        try {
            //let path1="public/img/users/" + req.file.filename;
            //console.log(path1);

            const pat1= Supportingdoc.create({
                
                colid: colid,
                name: name,
                user:user1,
                criteria:criteria,
                metric:metric,
                link: req.file.location,
                filename: req.file.key,
                field1:req.body.field1,
                classdate:new Date(),
                type:req.body.type,
                collection1:req.body.collection1



            });
           
            //console.log('uploaded');
            res.status(401).json({
                status: 'Success'
            });
        } catch(err1) {
            res.status(401).json({
                status: 'Error',
                error: err1
            });

        }

    });
};