import { useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

import {
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction
} from "@solana/spl-token";
import Modal from "../../UI/Modal";

import styles from "../../styles/Home.module.css";

const CreateTokenAccount = (props) => {
	const [sig, setSig] = useState("");
	const [tokenAccount, setTokenAccount] = useState("");

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const sigAndTokenAccount = () => {
		return (
			sig &&
			`This is the sig ${sig} and this is the token account ${tokenAccount}`
		);
	};

	const createTokenAccountHandler = async (e) => {
		e.preventDefault();
		if (!connection || !publicKey) {
			return;
		}
		const transaction = new web3.Transaction();
		const mint = new web3.PublicKey(e.target.mint.value);
		const owner = new web3.PublicKey(e.target.owner.value);

		const associatedToken = await getAssociatedTokenAddress(
			mint,
			owner,
			false,
			TOKEN_PROGRAM_ID,
			ASSOCIATED_TOKEN_PROGRAM_ID
		);

		transaction.add(
			createAssociatedTokenAccountInstruction(
				publicKey,
				associatedToken,
				owner,
				mint,
				TOKEN_PROGRAM_ID,
				ASSOCIATED_TOKEN_PROGRAM_ID
			)
		);

		const txnSig = await sendTransaction(transaction, connection);
		setSig(txnSig);
		setTokenAccount(associatedToken.toBase58());
	};

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={createTokenAccountHandler}>
				<div className={styles.label}>
					<label className={styles["label-fields"]} htmlFor="mint">
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
					<label className={styles["label-fields"]} htmlFor="owner">
						Token Account Owner:
					</label>
					<input
						id="owner"
						type="text"
						className={styles.input}
						placeholder="Enter the PublicKey of the Token Account Owner"
						required
					/>
				</div>
				<div>
					<button className={styles["button-confirm"]} type="submit">
						Create Token Account
					</button>
				</div>
				<p>{sigAndTokenAccount()}</p>
			</form>
		</Modal>
	);
};

export default CreateTokenAccount;
