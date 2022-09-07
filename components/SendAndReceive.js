import styles from "../styles/Home.module.css";

const SendAndReceive = (props) => {
	return (
		<div>
			<button className={styles["button-main"]} onClick={props.toggle}>
				Send
			</button>
			<button className={styles["button-main"]}>Receive</button>
		</div>
	);
};

export default SendAndReceive;
