import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import * as web3 from "@solana/web3.js";
import {
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createMintToInstruction,
	getAccount,
	mintTo,
	getMint
} from "@solana/spl-token";

import Modal from "../UI/Modal";

import styles from "../styles/Home.module.css";

export const MintTokens = (props) => {
	//const [sig, setSig] = useState("");
	//const [tokenAccount, setTokenAccount] = useState("");
	//const [balance, setBalance] = useState("");

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const mintTokenHandler = async (e) => {
		if (!connection || !publicKey) {
			return;
		}

		//const transaction = new web3.Transaction();

		const mintPubKey = new web3.PublicKey(e.target.mint.value);
		const recipientPubkey = new web3.PublicKey(e.target.recipient.value);
		const amount = e.target.amount.value;
		console.log(`this is the amount: ${amount}`);

		try {
			const mintTokens = await mintTo(
				connection,
				publicKey,
				mintPubKey,
				recipientPubkey,
				mintPubKey,
				amount
			);
			console.log(`mintTokens function returned: ${mintTokens}`);
			const mintInfo = await getMint(connection, mintPubKey);
			console.log(`the new mint supply: ${mintInfo.supply}`);

			// const associatedToken = await getAssociatedTokenAddress(
			// 	mintPubKey,
			// 	recipientPubkey,
			// 	false,
			// 	TOKEN_PROGRAM_ID,
			// 	ASSOCIATED_TOKEN_PROGRAM_ID
			// );

			// console.log("hit after associatedtoken call", associatedToken);

			// transaction.add(
			// 	createMintToInstruction(mintPubKey, associatedToken, publicKey, amount)
			// );

			// console.log("hit after createminttoinstruction");

			// const signature = await sendTransaction(transaction, connection);

			// setSig(signature);
			// setTokenAccount(associatedToken.toBase58());

			// const account = await getAccount(connection, associatedToken);

			// setBalance(account.amount.toBase58());
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={mintTokenHandler}>
				<div className={styles.label}>
					<label htmlFor="mint" className={styles["label-fields"]}>
						Token Mint:
					</label>
					<input
						id="mint"
						type="text"
						className={styles.input}
						placeholder="Enter Token Mint"
						required
					/>
				</div>
				<div className={styles.label}>
					<label htmlFor="recipient" className={styles["label-fields"]}>
						Recipient:
					</label>
					<input
						id="recipient"
						type="text"
						className={styles.input}
						placeholder="Enter Recipient PublicKey"
						required
					/>
				</div>
				<div className={styles.label}>
					<label htmlFor="amount" className={styles["label-fields"]}>
						Amount of Tokens to Mint:
					</label>
					<input
						id="amount"
						type="number"
						className={styles.input}
						placeholder="e.g. 100"
						required
					/>
				</div>
				<div>
					<button className={styles["button-confirm"]} type="submit">
						Mint Tokens
					</button>
				</div>
			</form>
		</Modal>
	);
};
