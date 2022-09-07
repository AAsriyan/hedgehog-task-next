import { useEffect, useState } from "react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Card from "../../UI/Card";
import Token from "./Token";

const TokenList = (props) => {
	const [tokenList, setTokenList] = useState([]);
	const { connection } = useConnection();
	const { publicKey } = useWallet();

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
				return (
					<Token
						key={token.pubkey.toBase58()}
						tokenInfo={token}
						copyText={props.copyText}
						toggle={props.toggle}
						onClose={props.onClose}
					/>
				);
			})}
		</Card>
	);
};

export default TokenList;
