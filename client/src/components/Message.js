import React from 'react';

const styles =
{
	name:
	{
		"fontWeight":"bold"
	}
}
const Message = props =>
(
	<p><div style={styles.name}>{props.name}:</div> {props.message}</p>
)

export default Message;