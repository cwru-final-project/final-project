const express = require('express');
const usersModel = require('../models/users-model.js');
const aesjs = require('aes-js');
const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

module.exports = 
{
	findAll: function(req, res)
	{
		usersModel.findAll(function(result)
		{
			console.log(result)
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
				console.log("There is no user with this email.")
				res.send("There is no user with this email.")
			}

			else if (result[0].password !== encryptedHex)
			{
				console.log("This is the wrong password!")
				res.send("This is the wrong password!")
			}

			else if (result[0].password === encryptedHex)
			{
				console.log("You're in!")
				res.send("You're in!")
			}

			else
			{
				console.log("There seems to have been an issue.")
				res.send("There seems to have been an issue.")
			}
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
				usersModel.newUser(req.body.name, req.body.email, encryptedHex, req.body.age, function(result)
				{
					console.log(result)
				})
			}

			else
			{
				console.log("A user with this email already exists.")
			}
		})
	}
}