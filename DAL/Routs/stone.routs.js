const {Router} = require('express')
const controller = require('../../Controllers/stone.controller')

const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.get('/getStonesAll',urlencodedParser,controller.getStonesAll);
router.post('/addStone',urlencodedParser,controller.addStone);
router.post('/editStone',urlencodedParser,controller.editStone);
router.post('/deleteStone',urlencodedParser,controller.deleteStone);


module.exports = router;
