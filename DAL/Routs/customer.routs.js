const {Router} = require('express')
const controller = require('../../Controllers/customer.controller')
const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.post('/registration',urlencodedParser,controller.registration);
router.get('/getOnlyCustomers',urlencodedParser,controller.getOnlyCustomers);
router.get('/getAll',urlencodedParser,controller.getCustomers);
router.get('/getCustomerById/:id',urlencodedParser,controller.getCustomerById);
router.get('/getName/:lastName',urlencodedParser,controller.getCustomer);
router.get('/getOfNumber/:number',urlencodedParser,controller.getOfNumber);
router.post('/edit',urlencodedParser,controller.editCustomer);
router.post('/del/:id',urlencodedParser,controller.delCustomer);

module.exports = router;

