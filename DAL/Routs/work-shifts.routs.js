const { Router } = require('express')
const Model = require('../../models')
const controller = require('../../Controllers/workShift.Controller')
const body_parser = require('body-parser')
const { check } = require('express-validator')
const router = Router()

let urlencodedParser = body_parser.urlencoded({ extended: false })

router.post('/getShiftsByMonth', urlencodedParser, controller.getShiftsByMonth)
router.post('/saveShiftByUser', urlencodedParser, controller.workShiftCreate)
router.post('/destroyMandate', urlencodedParser, controller.mandateDelete)


module.exports = router