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
		orm.findOne("users", "email", value, function(result)
		{
			cb(result)
		})
	}
}


module.exports = user;
