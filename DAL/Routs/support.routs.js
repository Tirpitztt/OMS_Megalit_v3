const {Router} = require('express')
const controller = require('../../Controllers/supportController')
const awsController = require('../../Controllers/aws.controller')
const gdsController = require('../../Controllers/gds.controller')
const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.get('/getMaterial',urlencodedParser,controller.getMaterial);
router.get('/getRates',urlencodedParser,controller.getRates);
router.get('/getMaterials',urlencodedParser,controller.getMaterials);
router.post('/addMaterial',urlencodedParser,controller.addMaterial);
router.post('/updateMaterial',urlencodedParser,controller.updateMaterial);
router.post('/deleteMaterial',urlencodedParser,controller.deleteMaterial);
router.post('/addRates',urlencodedParser,controller.addRates);
router.post('/updateRates',urlencodedParser,controller.updateRates);
router.get('/contures',urlencodedParser,awsController.getContures);
router.post('/contures',urlencodedParser,awsController.getConturesFolder);
router.post('/avatars',urlencodedParser,awsController.getAvatars)
router.get('/getWorkOperations',urlencodedParser,controller.getWorkOperations);
router.post('/getWorkOperation',urlencodedParser,controller.getWorkOperation);
router.post('/addWorkOperation',urlencodedParser,controller.addWorkOperation);
router.post('/updateWorkOperation',urlencodedParser,controller.updateWorkOperation);
router.post('/deleteWorkOperation',urlencodedParser,controller.deleteWorkOperation);
router.post('/addGds',urlencodedParser,gdsController.addGds);
router.post('/editGds',urlencodedParser,gdsController.editGds);
router.post('/deleteGds',urlencodedParser,gdsController.deleteGds);
router.post('/getStandartKit',urlencodedParser,controller.getStandart100Kit)

module.exports = router;
