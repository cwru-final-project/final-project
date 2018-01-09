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

router.route(`/message/roll`).post(chatController.postRoll)

router.route(`/findwaiters/:id/:intent`).get(userController.findWaiters)

router.route(`/update/:setField/:setValue/:whereField/:whereValue`).get(userController.updateField)

router.use(function(req, res) 
{
  	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


//Deletes all messages that are more than an hour old.  Checks once a minute.

const deleteCheck = function()
{
	connection.query(`SELECT DISTINCT current_room FROM users`, function(err, result)
	{
		if (result[0] !== undefined)
		{
			console.log("Logging result from delete messages...")
			console.log(result)
			result.forEach(object =>
			{
				if (object.current_room !== "" && object.current_room !== null)
				{
					const room = object.current_room+"_chats";

					connection.query(`SELECT id, time FROM ${room}`, function(err, result2)
					{
						result2.forEach(object2 =>
						{
							if (Math.abs((Date.now()/(60*1000).toFixed(0) - parseInt((new Date(object2.time).getTime() / (60*1000)).toFixed(0))).toFixed(0)) > 59)
							{
								connection.query(`DELETE FROM ${room} WHERE id=${object2.id}`, function(err, result3)
								{
								})
							}
						})
					})
				}
			})
		}
	})
}

deleteCheck()
setInterval(function()
{
	deleteCheck()
}, 60*1000);

module.exports = router;