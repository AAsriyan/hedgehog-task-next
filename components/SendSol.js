import { useState } from "react";
import Modal from "../UI/Modal";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";

import styles from "../styles/Home.module.css";

const SendSol = (props) => {
	const [sig, setSig] = useState("");
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	console.log(sig, "this is the sig");

	const sendSolToken = async (e) => {
		e.preventDefault();
		if (!connection || !publicKey) {
			// remember to put in better user feedback here
			return;
		}
		const transaction = new web3.Transaction();
		const recipientPubkey = new web3.PublicKey(e.target.recipient.value);

		const sendSolInstruction = web3.SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: recipientPubkey,
			lamports: LAMPORTS_PER_SOL * e.target.amount.value
		});

		transaction.add(sendSolInstruction);
		// using set timeout just to make sure the transaction went out before updating the balance.
		const signature = await sendTransaction(transaction, connection);

		setTimeout(() => {
			setSig(signature);
			props.refresh();
			//props.onClose();
		}, 1000);
	};

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={sendSolToken}>
				<div className={styles.label}>
					<label className={styles["label-fields"]} htmlFor="amount">
						Amount to send:
					</label>
					<input
						id="amount"
						type="text"
						className={styles.input}
						placeholder="e.g. 0.1"
						required
					/>
				</div>
				<div className={styles.label}>
					<label className={styles["label-fields"]} htmlFor={"recipient"}>
						Send SOL to:
					</label>
					<input
						id="recipient"
						type="text"
						className={styles.input}
						placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
						required
					/>
				</div>
				<div>
					<button className={styles["button-confirm"]} type="submit">
						Send
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default SendSol;
