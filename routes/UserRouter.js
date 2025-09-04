var express =require('express');
var router =express.Router();
const uploadFile= require("../middlewares/uploadFile")
const UserController=require("../controllers/UserController")

router.get('/getAllUsers',UserController.getAllUsers);
router.get('/getUserById/:id',UserController.getUserById);
router.get('/getUserByAge/:age',UserController.getUserByAge);
router.post('/addClient',UserController.addClient);
router.delete('/deleteUserbyId/:id',UserController.deleteUserbyId);
//router.get('/addClientWithImage',uploadFile.single("user_Image"),UserController.addClientWithImage);

module.exports =router;



//http://localhost:5000/users/getAllUsers
//http://localhost:5000/players/getAllPlayers