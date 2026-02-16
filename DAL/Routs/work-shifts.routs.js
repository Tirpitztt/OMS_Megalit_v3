const { Router } = require('express')
const Model = require('../../models')
const controller = require('../../Controllers/workShift.Controller')
const body_parser = require('body-parser')
const { check } = require('express-validator')
const router = Router()

let urlencodedParser = body_parser.urlencoded({ extended: false })

router.post('/getShiftsByMonth', urlencodedParser, controller.getShiftsByMonth)

module.exports = router