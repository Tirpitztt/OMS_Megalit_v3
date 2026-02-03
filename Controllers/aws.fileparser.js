const {formidable} = require('formidable');
const Transform = require('stream').Transform;
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");


// на сервере создать переменные среды, здесь заменить на proccess.env

const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY
const region = process.env.REACT_APP_REGION
const Bucket = process.env.REACT_APP_BUCKET


const fileParser = async (req) => {
    //console.log(req)
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 100 * 1920 * 1080, //100 MBs converted to bytes,
            allowEmptyFiles: false
        }
        //let path = 'megalit/contures/Added';
        let path = req.body.path
        const form = formidable(options);
        //const [fields,files] = await form.parse(req)

        form.parse(req, async (err, fields, files) => {
            if(err){
                console.log('errINparse')
            }
            let recipe = JSON.parse(fields.recipe[0])
            path = recipe.path
            console.log('form.parse',path)
        });
        console.log('pp',path)
        form.on('error', error => {
            reject(error.message)
            console.log('error',error.message)
        })

        form.on('data', data => {
            if (data.name === "complete") {
                resolve(data.value);
            }
        })
        form.on('fileBegin', (formName, file) => {
            console.log('form.on:',path)
            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk)
                    }
                })

                this._writeStream.on('error', e => {
                    form.emit('error', e)
                });

                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey
                        },
                        region
                    }),
                    params: {
                        ACL: 'public-read',
                        Bucket,
                        Key: `${path}/${Date.now().toString()}-${this.originalFilename}`,
                        Body: this._writeStream
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false, // optional manually handle dropped parts
                })
                    .done()
                    .then(data => {
                        form.emit('data', { name: "complete", value: data });
                       // console.log('inPromise',data)
                    }).catch((err) => {
                    form.emit('error', err);
                    //console.log('inPromiseErr',err)
                })
            }
            file.end = function (cb) {
                this._writeStream.on('finish', () => {
                    this.emit('end')
                    cb()
                })
                this._writeStream.end()
            }
        })
    })
}

module.exports = fileParser;
