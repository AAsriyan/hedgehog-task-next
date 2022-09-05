import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<div className={styles.App}>
			<Head>
				<title>Hedgehog Task</title>
			</Head>
		</div>
	);
};

export default Home;
