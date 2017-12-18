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
	}
}