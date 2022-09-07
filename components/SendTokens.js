import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
	createMint,
	getOrCreateAssociatedTokenAccount,
	mintTo,
	transfer
} from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

import Modal from "../UI/Modal";

const SendTokens = () => {
	const { connection } = useConnection();
	const { publicKey, signTransaction, sendTransaction } = useWallet();

	const sendTokensHandler = async (e) => {
		try {
			if (!publicKey || !connection) throw new WalletNotConnectedError();
			const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
				connection,
				publicKey,
				mint,
				toPublicKey
			);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal>
			<form onSubmit={sendTokensHandler}>
				<div>Recepient Address:</div>
				<div></div>
				<div>Amount to Send:</div>
				<div>
					<button type="submit">Send</button>
				</div>
			</form>
		</Modal>
	);
};
