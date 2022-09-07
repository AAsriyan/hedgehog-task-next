import { Transaction } from "@solana/web3.js";

export const signAndSendRawTransaction = async (
	connection,
	wallet,
	instruction,
	signers = []
) => {
	const transaction = new Transaction().add(...instruction);
	transaction.feePayer = wallet.publicKey;

	const anyTransaction = transaction;
	anyTransaction.recentBlockhash = (
		await connection.getLatestBlockhash()
	).blockhash;
	const signedTransaction = await wallet.signTransaction(transaction);
	signers.forEach((key) => {
		signedTransaction.partialSign(key);
	});
	const rawTransaction = signedTransaction.serialize();
	return await connection.sendRawTransaction(rawTransaction, {
		skipPreflight: false,
		preflightCommitment: "single"
	});
};
