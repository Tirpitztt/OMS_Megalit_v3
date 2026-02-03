const {Router} = require('express')
const controller = require('../../Controllers/beton.controller')
const detController = require('../../Controllers/betonDetail.Controller')

const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.get('/getBetonState',urlencodedParser,controller.getBetonState);
router.post('/getBetonMixOne',urlencodedParser,controller.getBetonMixOne);
router.post('/addBetonMix',urlencodedParser,controller.addBetonMix);
router.post('/updateBetonMix',urlencodedParser,controller.updateBetonMix);
router.post('/deleteBetonMix',urlencodedParser,controller.deleteBetonMix);
router.post('/deleteIngredient',urlencodedParser,controller.deleteIngredient);

router.get('/getBetonDetailsAll',urlencodedParser,detController.getBetonDetails);
router.post('/getBetonDetail',urlencodedParser,detController.getBetonDetailOfId);
router.post('/addBetonDetail',urlencodedParser,detController.addBetonDetail);
router.post('/updateBetonDetail',urlencodedParser,detController.updateBetonDetail);
router.post('/deleteBetonDetail',urlencodedParser,detController.deleteBetonDetail);
router.post('/deleteAdditionalMat',urlencodedParser,detController.deleteAdditionalMat);

module.exports = router;
