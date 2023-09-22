'use strict';

const express = require('express');
const app = express();
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
var cors = require('cors')
const port = 4500;


app.use(cors())

AWS.config.update({
  secretAccessKey: '',
  accessKeyId: ''
  region: 'ap-southeast-2'
});


////  UPLOAD TO S3 //////
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'private',
    bucket: 'n10003703-ass2',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null,'Blender-Files/' + file.originalname)
    }
  })
})


app.post('/upload', upload.single('file'),(req, res) => {
  console.log('Successfully uploaded' + req.file.key);
  res.redirect('/send?key=' + req.file.key)
});



const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

////  ADD TO SQS QUEUE //////
const queueUrl = "https://sqs.ap-southeast-2.amazonaws.com/901444280953/n10003703-blender";
// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
app.get('/send', function (req, res) {
  var params = {
      MessageBody: req.query.key,
      QueueUrl: queueUrl,
      DelaySeconds: 0
  };

  sqs.sendMessage(params, function(err, data) {
      if(err) {
          res.send(err);
      }
      else {
          res.send(data);
      }
  });
});

const getkeys = () => {
  let images = [];
  let re = /(?:\.([^.]+))?$/;
  var params = { Bucket: 'n10003703-ass2' };

  return new Promise((resolve,reject) => {
s3.listObjects(params, function(err, data) {
  if (err) reject(err);
  data.Contents.map(object => {
    let ext = re.exec(object.Key)[1];
    if(ext == "png"){
      images.push(object.Key)
    }
})
resolve(images) 
})
});
}


app.get('/images', (req,res) => {
  let photos = [];
  getkeys().then(images =>{
    images.map(image => {
      const params = {Bucket: 'n10003703-ass2', Key: image, Expires: 60 * 5};
    s3.getSignedUrl('getObject', params, function (err, url) {
      console.log('The URL is', url);
      photos.push({src: url,
        width: 4,
        height: 3})
        if(images.length === photos.length){
          res.send(photos)
        }
    })
    })
  })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
