import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useEffect, useState } from "react";

import Card from "../UI/Card";
import Token from "./Token";

const TokenList = () => {
	const [tokenList, setTokenList] = useState([]);
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	useEffect(() => {
		const getTokenList = async () => {
			const tokenAccounts = await connection.getTokenAccountsByOwner(
				publicKey,
				{
					programId: TOKEN_PROGRAM_ID
				}
			);

			setTokenList(tokenAccounts.value);
		};

		getTokenList();
	}, [connection, publicKey]);

	return (
		<Card>
			{tokenList.map((token) => {
				return <Token key={token.pubkey.toBase58()} tokenInfo={token} />;
			})}
		</Card>
	);
};

export default TokenList;
