const {Router} = require('express')
const controller = require('../../Controllers/main.controller')


const body_parser = require('body-parser')
const router = Router()

let urlencodedParser = body_parser.urlencoded({extended:false})

router.get('/getMainState',urlencodedParser,controller.getMainState);
router.post('/getCalcState',urlencodedParser,controller.getCalcState);
router.post('/getCalcOfDate',urlencodedParser,controller.getCalcOfDate)
router.post('/getArticleOne',urlencodedParser,controller.getArticleOfId);
router.post('/addArticle',urlencodedParser,controller.addArticle);
router.post('/editArticle',urlencodedParser,controller.editArticle);
router.post('/deleteArticle',urlencodedParser,controller.deleteArticle);
router.post('/deleteComment',urlencodedParser,controller.deleteComment);
router.post('/addComment',urlencodedParser,controller.addComment);
router.post('/addFile',urlencodedParser,controller.addFile)


module.exports = router;
