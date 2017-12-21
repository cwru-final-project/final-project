import React from 'react';

const styles =
{
	name:
	{
		"fontWeight":"bold",
		"marginBottom":"0px"
	}
}
const Message = props =>
(
	<div>
	<p style={styles.name}>{props.name}:</p>
	<p>{props.message}</p>
	</div>
)

export default Message;