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

	findAllByRoom: function(room, cb)
	{
		orm.findAllByRoom("users", room, function(result)
		{
			cb(result)
		});
	},

	findOneUser: function(field, value, cb)
	{
		orm.findOne("users", field, value, function(result)
		{
			cb(result)
		})
	},

	login: function(value, cb)
	{
		orm.findOneByEmail("users", value, function(result)
		{
			cb(result)
		})
	},

	newUser: function(name, email, password, age, token,  cb)
	{
		orm.newUser(name, email, password, age, token, function(result)
		{
			cb(result)
		})
	},

	updateToken: function(token, email, cb)
	{
		orm.updateToken(token, email, function(result)
		{
			cb(result)
		})
	},

	updateRoom: function(room, token, cb)
	{
		orm.updateRoom(room, token, function(result)
		{
			cb(result)
		})
	},

	findOneByToken: function(token, cb)
	{
		orm.findOneByToken("users", token, function(result)
		{
			cb(result)
		})
	},

	findWaiters: function(intent, cb)
	{
		orm.findAllWhereTwo("users", "waiting", 1, intent, 1, function(result)
		{
			cb(result)
		})
	},

	updateField: function(setField, setValue, whereField, whereValue, cb)
	{
		orm.updateField("users", setField, setValue, whereField, whereValue, function(result)
		{
			cb(result)
		})
	},

	createTable: function(name, cb)
	{
		orm.createTable(name, function(result)
		{
			cb(result)
		})
	}
}


module.exports = user;
