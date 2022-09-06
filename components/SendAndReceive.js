const SendAndReceive = (props) => {
	return (
		<div>
			<button onClick={props.toggle}>Send</button>
			<button>Receive</button>
		</div>
	);
};

export default SendAndReceive;
