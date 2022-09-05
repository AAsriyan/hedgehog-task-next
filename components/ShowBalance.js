import { useEffect, useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowBalance = () => {
	const [balance, setBalance] = useState(0);
	const [hasPublicKey, setHasPublicKey] = useState(false);
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	useEffect(() => {
		if (!connection || !publicKey) {
			// better error handling here
			return;
		}

		if (publicKey) {
			setHasPublicKey(true);
		}

		connection.getAccountInfo(publicKey).then((info) => {
			console.log(info);
			setBalance(info.lamports);
		});
	}, [connection, publicKey]);

	return (
		<div>
			<p>
				{hasPublicKey &&
					`Balance: INSERT_BALANCE ${balance / LAMPORTS_PER_SOL}`}
			</p>
		</div>
	);
};

export default ShowBalance;
