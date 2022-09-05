const SendAndReceive = (props) => {
	return (
		<div>
			<button onClick={props.onSend}>Send</button>
			<button>Receive</button>
		</div>
	);
};

export default SendAndReceive;
