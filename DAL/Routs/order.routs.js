const {Router} = require('express')
const controller = require('../../Controllers/order.controller')
const delController = require('../../Controllers/deleteController')
const editController = require('../../Controllers/editController')
const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.post('/newOrder',urlencodedParser,controller.createNewOrder);
router.post('/delOrder',urlencodedParser,delController.deleteOrder);
router.get('/editOrder/:orderId',urlencodedParser,editController.editOrder);
router.get('/get_order/:orderId',urlencodedParser,controller.getOrderOfNum);
router.post('/getAllOrders',urlencodedParser,controller.getAllOrders);
router.post('/updateOrder',urlencodedParser,editController.updateOrder)
//router.post('/editComplect',urlencodedParser,editController.editComplect);
// router.post('/addComplect',urlencodedParser,editController.addComplect);
// router.post('/addMontaz',urlencodedParser,editController.addMontaz);
// router.post('/addHandlings',urlencodedParser,editController.addHandlings);
// router.post('/deleteComplect',urlencodedParser,editController.deleteComplect);
// router.post('/deleteDetail',urlencodedParser,editController.deleteDetail);
// router.post('/deleteHandling',urlencodedParser,editController.deleteHandel);
// router.post('/deleteMontaz',urlencodedParser,editController.deleteMontaz);
router.post('/deleteSketchByID',urlencodedParser,delController.deleteSketchByID)
// router.post('/editMontaz',urlencodedParser,editController.editMontaz);
router.post('/editNotice',urlencodedParser,editController.editNotice);
// router.post('/editSketchPath',urlencodedParser,editController.editSketchPath);
//router.post('/editTextGrav',urlencodedParser,editController.editTextGrav);
 router.post('/editStatus',urlencodedParser,editController.editStatus);
// router.post('/editTermin',urlencodedParser,editController.editTermin);
// router.post('/editBodyOrder',urlencodedParser,editController.editBodyOrder);
router.post('/getEditable',urlencodedParser,controller.getEditableOrder);
router.post('/addHistory',urlencodedParser,editController.addEditHistory);

module.exports = router;
