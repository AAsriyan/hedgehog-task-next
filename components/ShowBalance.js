import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowBalance = ({ balance }) => {
	return (
		<div>
			<p>{`Balance: INSERT_BALANCE ${balance / LAMPORTS_PER_SOL}`}</p>
		</div>
	);
};

export default ShowBalance;
