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

	findOneByEmail: function(table, value, cb)
	{
		connection.query(`SELECT * FROM ${table} WHERE email = ?`, [value], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	newUser: function(name, email, password, age, cb)
	{
		connection.query(`INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)`, [name, email, password, age], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
}

module.exports = orm;