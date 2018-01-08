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
		connection.query(`SELECT id, name, age FROM ${table} WHERE current_room=?`, [room], function(err, result)
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

	deleteOne: function(table, field, value, cb)
	{
		connection.query(`DELETE FROM ${table} WHERE ? = ?`, [field, value], function(err, result)
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

	postMessage: function(table, userid, message, cb)
	{
		connection.query(`INSERT INTO ${table} (userid, message) VALUES (?, ?)`, [userid, message], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	findAllMessages: function(table, cb)
	{
		connection.query(`SELECT users.name, ${table}.message, ${table}.time FROM users INNER JOIN ${table} ON users.id = ${table}.userid ORDER BY ${table}.id`, function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	},

	updateField: function(table, setfield, setvalue, wherefield, wherevalue, cb)
	{
		connection.query(`UPDATE ${table} SET ${setfield} = ? WHERE ${wherefield} = ?`, [setvalue, wherevalue], function(err, result)
		{
			if(err){throw err}
			cb(result)
		})
	}
}

module.exports = orm;