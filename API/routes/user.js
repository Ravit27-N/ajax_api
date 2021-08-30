const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view); // completed
router.post('/', userController.find);//complted
router.get('/adduser', userController.form); //completed
router.post('/adduser', userController.create); //completed
router.get('/edituser/:id', userController.edit); //completed
router.post('/edituser/:id', userController.update); //completed
router.get('/viewuser/:id', userController.viewall); //completed
router.get('/:id',userController.delete); //completed
  
module.exports = router;