import React from 'react';

const styles =
{
	name:
	{
		"fontWeight":"bold",
		"fontSize": "15px",
		color: "black"
	},

	date:
	{
		"color": "black",
		"fontWeight":"normal",
		"fontSize": "10px",
	},

	message:
	{
		"color": "black",
		"fontWeight":"normal",
		"fontSize": "15px",
	}
}
const Message = props =>
(
	<div className="alert alert-dark" role="alert">
		<div style={styles.name}>{props.name}: <span style={styles.message}>{props.message}</span><span className="float-right" style={styles.date}>{props.time}</span></div>
	</div>
)

export default Message;