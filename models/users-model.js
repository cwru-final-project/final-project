const orm = require("../config/orm.js");

const user = 
{
	findAll: function(cb)
	{
		orm.findAll("users", function(result)
		{
			cb(result)
		});
	},

	login: function(value, cb)
	{
		orm.findOneByEmail("users", value, function(result)
		{
			cb(result)
		})
	},

	newUser: function(name, email, password, age, cb)
	{
		orm.newUser(name, email, password, age, function(result)
		{
			cb(result)
		})
	}
}


module.exports = user;
