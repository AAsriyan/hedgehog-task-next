import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import * as web3 from "@solana/web3.js";
import {
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createMintToInstruction,
	getAccount
} from "@solana/spl-token";

import Modal from "../UI/Modal";

export const MintTokens = (props) => {
	const [sig, setSig] = useState("");
	const [tokenAccount, setTokenAccount] = useState("");
	const [balance, setBalance] = useState("");

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const mintTokenHandler = async (e) => {
		if (!connection || !publicKey) {
			return;
		}

		const transaction = new web3.Transaction();

		const mintPubKey = new web3.PublicKey(e.target.mint.value);
		const recipientPubkey = new web3.PublicKey(e.target.recipient.value);
		const amount = e.target.amount.value;

		const associatedToken = await getAssociatedTokenAddress(
			mintPubKey,
			recipientPubkey,
			false,
			TOKEN_PROGRAM_ID,
			ASSOCIATED_TOKEN_PROGRAM_ID
		);

		console.log("hit after associatedtoken call", associatedToken);

		console.log(mintPubKey, associatedToken, publicKey, amount);
		transaction.add(
			createMintToInstruction(mintPubKey, associatedToken, publicKey, amount)
		);

		const signature = await sendTransaction(transaction, connection);
		console.log("hit after sig call");

		setSig(signature);
		setTokenAccount(associatedToken.toBase58());

		const account = await getAccount(connection, associatedToken);
		console.log(account.amount.toBase58());
		console.log("hit after account call");
		setBalance(account.amount.toBase58());
		console.log(sig.toBase58());
		console.log(`this is the account amount ${account.amount.toBase58()}`);
	};

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={mintTokenHandler}>
				<div>
					<label htmlFor="mint">Token Mint:</label>
					<input
						id="mint"
						type="text"
						placeholder="Enter Token Mint"
						required
					/>
				</div>
				<div>
					<label htmlFor="recipient">Recipient:</label>
					<input
						id="recipient"
						type="text"
						placeholder="Enter Recipient PublicKey"
						required
					/>
				</div>
				<div>
					<label htmlFor="amount">Amount of Tokens to Mint:</label>
					<input id="amount" type="text" placeholder="e.g. 100" required />
				</div>
				<div>
					<button>Mint Tokens</button>
				</div>
			</form>
		</Modal>
	);
};
