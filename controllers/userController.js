const express = require('express');
const usersModel = require('../models/users-model.js');

usersModel.findAll(function(result)
{
	console.log(result)
})

module.exports = usersModel