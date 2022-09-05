import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NavBar from "../components/NavBar";
import Card from "../UI/Card";

import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<div className={styles.App}>
			<Head>
				<title>Hedgehog Task</title>
			</Head>
			<WalletContextProvider>
				<div>
					<NavBar />
				</div>
				<Card>
					<div className={styles["connect-wallet"]}>
						<h2>Connect Your Wallet</h2>
						<WalletMultiButton />
					</div>
				</Card>
			</WalletContextProvider>
		</div>
	);
};

export default Home;
