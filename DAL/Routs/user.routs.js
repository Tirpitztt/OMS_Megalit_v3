const {Router} = require('express')
const Model = require('../../models')
const controller = require('../../Controllers/user.controller')
const body_parser = require('body-parser')
const {check} = require('express-validator')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.post('/registration',urlencodedParser,[
     check('name','field is empty').notEmpty(),
    check('login','field is empty').notEmpty(),
    check('password','password hui').isLength({min:4,max:25})
],controller.registration);
router.post('/login',urlencodedParser,controller.login);
router.get('/allUsers',controller.getUsers);
router.post('/getUser',urlencodedParser,controller.getUserOfId)

module.exports = router;
