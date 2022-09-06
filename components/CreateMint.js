import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	getMinimumBalanceForRentExemptMint,
	MINT_SIZE,
	TOKEN_PROGRAM_ID,
	createInitializeMintInstruction
} from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

const CreateMint = () => {
	const [sig, setSig] = useState("");
	const [mint, setMint] = useState("");

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const createMintHandler = async (e) => {
		e.preventDefault();
		if (!connection || !publicKey) {
			return;
		}

		const mint = web3.Keypair.generate();
		const lamports = await getMinimumBalanceForRentExemptMint(connection);

		const transaction = new web3.Transaction();

		transaction.add(
			web3.SystemProgram.createAccount({
				fromPubkey: publicKey,
				newAccountPubkey: mint.publicKey,
				space: MINT_SIZE,
				lamports,
				programId: TOKEN_PROGRAM_ID
			}),
			createInitializeMintInstruction(
				mint.publicKey,
				0,
				publicKey,
				publicKey,
				TOKEN_PROGRAM_ID
			)
		);

		sendTransaction(transaction, connection, {
			signers: [mint]
		}).then((sig) => {
			setSig(sig);
			console.log(sig);
			setMint(mint.publicKey.toString());
		});
	};

	return (
		<div>
			<form onSubmit={createMintHandler}>
				<button type="submit">Create Mint</button>
			</form>
		</div>
	);
};

export default CreateMint;