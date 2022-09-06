import { useState } from "react";
import Modal from "../UI/Modal";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";

const SendSol = (props) => {
	const [sig, setSig] = useState("");
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	console.log(sig, "this is the sig");

	const sendToken = (e) => {
		e.preventDefault();
		if (!connection || !publicKey) {
			// remember to put in better user feedback here
			console.log("not connected or have public key in send sol");
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
		sendTransaction(transaction, connection)
			.then((sig) => {
				setSig(sig);
				setTimeout(() => {
					props.refresh();
					console.log("inside set timeout");
				}, 2000);
			})
			.then(() => {
				console.log(sig);
			});
	};

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={sendToken}>
				<label htmlFor="amount">Amount to send:</label>
				<input id="amount" type="text" placeholder="e.g. 0.1" required />
				<br />
				<label htmlFor={"recipient"}>Send SOL to:</label>
				<input
					id="recipient"
					type="text"
					placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
					required
				/>
				<button type="submit">Send</button>
			</form>
		</Modal>
	);
};

export default SendSol;
