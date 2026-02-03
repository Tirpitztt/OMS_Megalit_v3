const {Router} = require('express')
const controller = require('../../Controllers/calculation.controller')
const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

//router.get('/createCalc/:orderId',urlencodedParser,controller.setCalculation);
router.post('/price_create',urlencodedParser,controller.priceCreate);
router.post('/create_cost',urlencodedParser,controller.createTotalCost);
router.post('/set-payment',urlencodedParser,controller.setPayment)
router.post('/total-cost-upd',urlencodedParser,controller.totalCostUpdate)


module.exports = router;
