import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import styles from "../styles/NavBar.module.css";

const NavBar = () => {
	const { publicKey } = useWallet();

	return (
		<div className={styles.navbar}>
			<h1>Solana Wallet Task</h1>
			{publicKey && <WalletDisconnectButton />}
		</div>
	);
};

export default NavBar;
