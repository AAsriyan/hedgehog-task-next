import { Fragment, useEffect, useState } from "react";

import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NavBar from "../components/NavBar";
import Card from "../UI/Card";

import styles from "../styles/Home.module.css";
import ShowBalance from "../components/ShowBalance";
import SendAndReceive from "../components/SendAndReceive";
import SendSol from "../components/SendSol";
import CreateMint from "../components/CreateMint";
import CreateTokenAccount from "../components/CreateTokenAccount";
import { MintTokens } from "../components/MintTokens";
import TokenList from "../components/TokenList";

const Home = () => {
	const [isSending, setIsSending] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const [isCreatingTokenAccount, setIsCreatingTokenAccount] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);
	const [balance, setBalance] = useState(0);

	const { connection } = useConnection();
	const { publicKey } = useWallet();

	useEffect(() => {
		if (!connection || !publicKey) {
			// better error handling here
			return;
		}

		connection.getAccountInfo(publicKey).then((info) => {
			setBalance(info.lamports);
		});
	}, [connection, publicKey, isRefresh]);

	const toggleSendHandler = () => {
		setIsSending((prevSendingState) => !prevSendingState);
	};

	const toggleMintingHandler = () => {
		setIsMinting((prevMintingState) => !prevMintingState);
	};

	const toggleCreatingAccountHandler = () => {
		setIsCreatingTokenAccount(
			(prevCreatingTokenAccountState) => !prevCreatingTokenAccountState
		);
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
			<div>
				<button onClick={toggleCreatingAccountHandler}>
					Create Token Account
				</button>
			</div>
			<div>
				<button onClick={toggleMintingHandler}>Mint Token</button>
			</div>
			{isMinting && <MintTokens onClose={toggleMintingHandler} />}
			<ShowBalance balance={balance} />
			<SendAndReceive toggle={toggleSendHandler} />
			{isSending && (
				<SendSol
					onClose={toggleSendHandler}
					refresh={() => setIsRefresh((prevState) => !prevState)}
				/>
			)}
			<TokenList />
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
