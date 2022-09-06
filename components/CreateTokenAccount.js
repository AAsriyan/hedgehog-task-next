import { useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

import {
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction
} from "@solana/spl-token";

const CreateTokenAccount = () => {
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
		<form onSubmit={createTokenAccountHandler}>
			<label htmlFor="mint">Token Mint:</label>
			<input id="mint" type="text" placeholder="Enter Token Mint" />
			<label htmlFor="owner">Token Account Owner:</label>
			<input
				id="owner"
				type="text"
				placeholder="Enter the PublicKey of the Token Account Owner"
				required
			/>
			<button type="submit">Create Token Account</button>
			<p>{sigAndTokenAccount()}</p>
		</form>
	);
};

export default CreateTokenAccount;
