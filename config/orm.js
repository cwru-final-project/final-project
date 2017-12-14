const connection = require('../config/connection.js');

const orm = 
{
	findAll: function(table, cb)
	{
		connection.query(`SELECT * FROM ${table}`, function(err, result)
		{
			if(err){throw err;}
			cb(result);
		})
	},

	findAllByRoom: function(table, room, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE current_room =?`, [room], function(err, result)
		{
			if(err){throw err;}
			cb(result);
		})
	},

	findOneByEmail: function(table, value, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE email = ?`, [value], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	newUser: function(name, email, password, age, token, cb)
	{
		connection.query(`INSERT INTO users (name, email, password, age, token) VALUES (?, ?, ?, ?, ?)`, [name, email, password, age, token], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateToken: function(token, email, cb)
	{
		connection.query(`UPDATE users SET token=? WHERE email=?`, [token, email], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateRoom: function(room, token, cb)
	{
		connection.query(`UPDATE users SET current_room=? WHERE token=?`, [room, token], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findOneByToken: function(table, value, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE token = ?`, [value], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},
}

module.exports = orm;