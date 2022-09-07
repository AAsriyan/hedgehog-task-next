import { AccountLayout } from "@solana/spl-token";

import styles from "../styles/Home.module.css";

const Token = (props) => {
	const accountData = AccountLayout.decode(props.tokenInfo.account.data);

	return (
		<div className={styles.token}>
			<div>Token: {accountData.amount.toString()}</div>
			<div>Mint: {accountData.mint.toBase58()}</div>
			<div>Public Key: {props.tokenInfo.pubkey.toBase58()}</div>
			<div>
				<button>Send</button>
				<button>Receive</button>
			</div>
		</div>
	);
};

export default Token;
