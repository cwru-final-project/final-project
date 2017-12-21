const path = require("path");
const router = require("express").Router();
const userController = require("../controllers/userController")
const chatController = require("../controllers/chatController")
const connection = require('../config/connection.js');

router.route("/findall").get(userController.findAll)

router.route("/updateToken").post(userController.updateToken)

router.route("/findallbyroom/:room").get(userController.findAllByRoom)

router.route("/find/:token").get(userController.findOneByToken)

router.route(`/login/:email/:password`).get(userController.login)

router.route(`/register`).post(userController.newUser)

router.route(`/updateroom`).post(userController.updateRoom)

router.route(`/findallmessages/:table`).get(chatController.findAllMessages)

router.route(`/message`).post(chatController.postMessage)

router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;