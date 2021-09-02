const express = require('express');
const router = express.Router();
const userController = require('../controllers/userHomeController');
const checkAuth  = require("../middleware/auth");
// const app = express();
// const form= require("./routes");
// app.use(form);


const iflogedin=(req,res,next)=>{
  if(req.user){
    next()
  }else{
    res.redirect("/login");
  }
}
const ifadmin=(req,res,next)=>{
  var{id} = req.user
  if(id==1){
    next()
  }
  else{
    res.send("You cannot delete/update/add user");
  }
}

// Route
router.get('/', userController.view);
// router.post('/', userController.find);
router.get('/adduser', userController.form);
// router.post('/adduser', userController.create);
router.get('/edituser', userController.edit);
// router.post('/edituser/:id', userController.update);
router.get('/viewuser', userController.viewall);

  
module.exports = router;