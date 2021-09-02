const router = require("express").Router();
const api = require('../controllers/apiHome/api');

router.get('/',api.viewAPI);
router.post('/', api.findAPI);
router.get('/adduser', api.formAPI);
router.post('/adduser', api.createAPI);
router.get('/edituser/:id', api.editAPI);
router.post('/edituser/:id', api.updateAPI);
router.get('/viewuser/:id', api.viewallAPI);
router.get('/:id', api.deleteAPI);
module.exports = router;
