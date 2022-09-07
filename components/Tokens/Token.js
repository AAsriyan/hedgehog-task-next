import { AccountLayout } from "@solana/spl-token";
import { useState } from "react";

import SendTokens from "./SendTokens";
import styles from "../../styles/Home.module.css";

const Token = (props) => {
	const [isSendingTokens, setIsSendingTokens] = useState(false);
	const accountData = AccountLayout.decode(props.tokenInfo.account.data);
	const onClose = () => setIsSendingTokens(false);

	return (
		<div className={styles.token}>
			<div>Token: {accountData.amount.toString()}</div>
			<div>Mint: {accountData.mint.toBase58()}</div>
			<div>Account Public Key: {props.tokenInfo.pubkey.toBase58()}</div>
			<div>
				<button
					onClick={() => setIsSendingTokens(true)}
					className={styles["button-main"]}
				>
					Send
				</button>
				<button
					onClick={() => props.copyText(props.tokenInfo.pubkey.toBase58())}
					className={styles["button-main"]}
				>
					Receive
				</button>
			</div>
			{isSendingTokens && (
				<SendTokens
					onClose={onClose}
					mint={accountData.mint}
					tokenAccountPubkey={props.tokenInfo.pubkey}
				/>
			)}
		</div>
	);
};

export default Token;
