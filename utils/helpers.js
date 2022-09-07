import { Transaction, PublicKey } from "@solana/web3.js";
import {
	getAssociatedTokenAddress,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction
} from "@solana/spl-token";

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

export const getOrCreateAssociatedTokenAccountIds = async (
	connection,
	payerKey,
	ownerKey,
	mintKey
) => {
	const associatedAddress = await getAssociatedTokenAddress(mintKey, ownerKey);
	console.log("associated address", associatedAddress);
	const accountInfo = await connection.getAccountInfo(associatedAddress);
	if (accountInfo !== null) {
		return { associatedAddress, instruction: null };
	}
	const createAssociatedAccountIx = createAssociatedTokenAccountInstruction(
		payerKey,
		associatedAddress,
		ownerKey,
		mintKey
	);
	return { associatedAddress, instruction: createAssociatedAccountIx };
};

export const sendTokens = async (
	connection,
	wallet,
	sourceAddress,
	receiverAddress,
	mintAddress,
	amount
) => {
	const { associatedAddress, instruction: instructionAccount } =
		await getOrCreateAssociatedTokenAccountIds(
			connection,
			wallet.publicKey,
			new PublicKey(receiverAddress),
			new PublicKey(mintAddress)
		);
	if (instructionAccount) {
		await signAndSendRawTransaction(connection, wallet, [instructionAccount]);
	}

	const instructionSend = createTransferInstruction(
		new PublicKey(sourceAddress),
		new PublicKey(associatedAddress),
		wallet.publicKey,
		Number(amount)
	);

	return await signAndSendRawTransaction(connection, wallet, [instructionSend]);
};
