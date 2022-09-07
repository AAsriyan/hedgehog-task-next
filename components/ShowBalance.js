import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowBalance = ({ balance }) => {
	return (
		<div>
			<h2>{`SOL Balance: ${balance / LAMPORTS_PER_SOL}`}</h2>
		</div>
	);
};

export default ShowBalance;
