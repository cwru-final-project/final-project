const express = require('express');
const usersModel = require('../models/users-model.js');
const aesjs = require('aes-js');
const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

const createToken = function()
{
	const inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	let token = "";
	const date = Date.now()

	for (var i=0; i<10; i++)
	{
		var r = Math.floor(Math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token+date
}

const createTableName = function()
{
	const inputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	let token = "";	

	for (var i=0; i<10; i++)
	{
		var r = Math.floor(Math.random()*(inputs.length-1));
		token = token + inputs[r];
	}

	return token;
}

module.exports = 
{
	findAll: function(req, res)
	{
		usersModel.findAll(function(result)
		{
			console.log(result)
		})
	},

	findAllByRoom: function(req, res)
	{
		usersModel.findAllByRoom(req.params.room, function(result)
		{
			res.send(result)
		})
	},

	updateToken: function(req, res)
	{
		console.log("HEY THERTE!!!")
		console.log(req.body)
		const token = createToken();
		usersModel.updateToken(token, req.body.email, function(result)
		{
			console.log(result);

			const data = 
			{
				token: token
			}

			res.send(data);
		})
	},

	login: function(req, res)
	{
		const textBytes = aesjs.utils.utf8.toBytes(req.params.password);
		const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		const encryptedBytes = aesCtr.encrypt(textBytes);
		const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

		usersModel.login(req.params.email, function(result)
		{
			if (!result[0])
			{
				res.send("No email")
			}

			else if (result[0].password !== encryptedHex)
			{
				res.send("Wrong password!")
			}

			else if (result[0].password === encryptedHex)
			{
				console.log("Great!")
				const token = createToken();
				usersModel.updateToken(token, result[0].email, function(result)
				{
					console.log(result);

					const data = 
					{
						token: token
					}

					res.send(data);
				})
			}

			else
			{
				res.send("Error")
			}
		})
	},

	updateRoom: function(req, res)
	{
		console.log("USER IS LOGGING OUT I THINK!")
		console.log("BODY")
		console.log("PARAMS")
		usersModel.updateRoom(req.body.room, req.body.token, function(result)
		{
			res.end()
		})
	},

	newUser: function(req, res)
	{
		const textBytes = aesjs.utils.utf8.toBytes(req.body.password);
		const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		const encryptedBytes = aesCtr.encrypt(textBytes);
		const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

		usersModel.login(req.body.email, function(result)
		{
			if (!result[0])
			{
				const token = createToken()
				usersModel.newUser(req.body.name, req.body.email, encryptedHex, req.body.age, token, function(result)
				{
					const data = 
					{
						token: token
					}

					res.send(data);
				})
			}

			else
			{
				res.send("Not new")
			}
		})
	},

	findOneByToken: function(req, res)
	{
		usersModel.findOneByToken(req.params.token, function(result)
		{
			res.send(result)
		})
	},

	updateField: function(req, res)
	{
		usersModel.updateField(req.params.setField, parseInt(req.params.setValue), req.params.whereField, req.params.whereValue, function(result)
		{
			res.send("updated!")
		})
	},

	findWaiters: function(req, res)
	{
		usersModel.findWaiters(req.params.intent, function(result)
		{
			console.log("finding waiters result...")
			console.log(result)
			const userid = req.params.id

			if (!result[0])
			{
				console.log("No one waiting!")
				usersModel.updateField("waiting", 1, "id", userid, function(result)
				{
					const newRoom = createTableName()
					usersModel.updateField("current_room", newRoom, "id", userid, function(result2)
					{
						usersModel.createTable(newRoom+"_chats", function(result3)
						{
							res.send("done")
						})
					})
				})
			}

			else
			{
				console.log("someone is waiting!")
				console.log(result)
				const r = Math.floor(Math.random() * (result.length))
				console.log("Going to match with..."+r)
				console.log(result[r].id)
				console.log(result[r].current_room)
				usersModel.updateField("current_room", result[r].current_room, "id", userid, function(result2)
				{
					usersModel.updateField("waiting", 0, "id", userid, function(result3)
					{
						usersModel.updateField("waiting", 0, "id", result[r].id, function(result4)
						{
							res.send("done")
						})
					})
				})
			}
		})
	}
}