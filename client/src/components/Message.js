import React from 'react';

const styles =
{
	name:
	{
		"fontWeight":"bold",
		"marginBottom":"0px"
	},

	date:
	{
		"fontSize": "10px"
	}
}
const Message = props =>
(
	<div className="alert alert-secondary" role="alert">
	  <h4 className="alert-heading">{props.name}</h4>
	  <p className="mb-0" style={styles.date}>{props.time}</p>
	  <hr></hr>
	  <p>{props.message}</p>
	</div>
)

export default Message;