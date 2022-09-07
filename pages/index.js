import { Fragment, useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";

import NavBar from "../components/NavBar";
import ShowBalance from "../components/ShowBalance";
import SendAndReceive from "../components/SendAndReceive";
import CreateMint from "../components/Mints/CreateMint";
import MintTokens from "../components/Mints/MintTokens";
import CreateTokenAccount from "../components/Mints/CreateTokenAccount";
import SendSol from "../components/Tokens/SendSol";
import TokenList from "../components/Tokens/TokenList";
import Card from "../UI/Card";

import styles from "../styles/Home.module.css";

const Home = () => {
	const [isSendingSol, setIsSendingSol] = useState(false);
	const [isSendingTokens, setIsSendingTokens] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [isCreatingTokenAccount, setIsCreatingTokenAccount] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);
	const [balance, setBalance] = useState(0);
	const [userPublicKey, setUserPublicKey] = useState("");

	const { connection } = useConnection();
	const { publicKey } = useWallet();

	useEffect(() => {
		if (!connection || !publicKey) {
			return;
		}
		setUserPublicKey(publicKey.toBase58());

		connection.getAccountInfo(publicKey).then((info) => {
			setBalance(info?.lamports ?? 0);
		});
	}, [connection, publicKey, isRefresh]);

	const toggleSendHandler = () => {
		setIsSendingSol((prevSendingState) => !prevSendingState);
	};

	const toggleSendTokensHandler = () => {
		setIsSendingTokens((prevSendingState) => !prevSendingState);
	};

	const toggleMintingHandler = () => {
		setIsMinting((prevMintingState) => !prevMintingState);
	};

	const toggleCreatingAccountHandler = () => {
		setIsCreatingTokenAccount(
			(prevCreatingTokenAccountState) => !prevCreatingTokenAccountState
		);
	};

	const copyTextHandler = async (copiedText) => {
		await navigator.clipboard.writeText(copiedText);
	};

	const walletNotConnected = (
		<Card>
			<div className={styles["connect-wallet"]}>
				<h2>Connect Your Wallet</h2>
				<WalletMultiButton />
			</div>
		</Card>
	);
	const showIfWalletConnected = (
		<Fragment>
			<CreateMint />
			{isCreatingTokenAccount && (
				<CreateTokenAccount onClose={toggleCreatingAccountHandler} />
			)}
			<div className={styles["label-fields"]}>
				<button
					className={styles["button-main"]}
					onClick={toggleCreatingAccountHandler}
				>
					Create Token Account
				</button>
			</div>
			<div className={styles["label-fields"]}>
				<button
					className={styles["button-main"]}
					onClick={toggleMintingHandler}
				>
					Mint Token
				</button>
			</div>
			{isMinting && <MintTokens onClose={toggleMintingHandler} />}
			<ShowBalance balance={balance} />
			<SendAndReceive
				userWalletKey={userPublicKey}
				copyText={copyTextHandler}
				toggle={toggleSendHandler}
			/>
			{isSendingSol && (
				<SendSol
					onClose={toggleSendHandler}
					refresh={() => setIsRefresh((prevState) => !prevState)}
				/>
			)}
			<TokenList
				toggle={toggleSendTokensHandler}
				isSendingTokens={isSendingTokens}
				copyText={copyTextHandler}
				onClose={toggleSendTokensHandler}
			/>
		</Fragment>
	);
	return (
		<div className={styles.App}>
			<Head>
				<title>Hedgehog Task</title>
			</Head>
			<div>
				<NavBar />
			</div>
			{publicKey ? showIfWalletConnected : ""}
			{publicKey ? "" : walletNotConnected}
		</div>
	);
};

export default Home;
