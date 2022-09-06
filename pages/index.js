import { useEffect, useState } from "react";

import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";
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

const Home = () => {
	const [isSending, setIsSending] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);
	const [balance, setBalance] = useState(0);

	const { connection } = useConnection();
	const { publicKey } = useWallet();

	useEffect(() => {
		if (!connection || !publicKey) {
			// better error handling here
			console.log("not connected or have public key in index");
			return;
		}

		console.log("hit");

		connection.getAccountInfo(publicKey).then((info) => {
			setBalance(info.lamports);
		});
	}, [connection, publicKey, isRefresh]);

	const showSendHandler = () => {
		setIsSending(true);
	};

	const hideSendHandler = () => {
		setIsSending(false);
	};

	const walletNotConnected = (
		<Card>
			<div className={styles["connect-wallet"]}>
				<h2>Connect Your Wallet</h2>
				<WalletMultiButton />
			</div>
		</Card>
	);
	return (
		<div className={styles.App}>
			<Head>
				<title>Hedgehog Task</title>
			</Head>
			<div>
				<NavBar />
			</div>
			<CreateMint />
			<CreateTokenAccount />
			<ShowBalance balance={balance} />
			<SendAndReceive onSend={showSendHandler} />
			{isSending && (
				<SendSol
					onClose={hideSendHandler}
					refresh={() => setIsRefresh((prevState) => !prevState)}
				/>
			)}
			{walletNotConnected}
		</div>
	);
};

export default Home;
