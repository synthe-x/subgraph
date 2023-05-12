import { Address, Bytes, BigInt, ethereum, BigDecimal, log } from "@graphprotocol/graph-ts";
import {
	Pool,
	Protocol,
	Synth,
	Collateral,
	Account,
	AccountPosition,
	AccountBalance,
	Token,
	Borrow,
	Repay,
	Mint,
	Burn,
	AccountDayData,
	AccountPositionDayData,
	PoolHrData,
	AccountPositionHrData,

} from "../../generated/schema";
import { ADDRESS_ZERO, ONE_BI, ZERO_BI, ETH_ADDRESS, ZERO_BD } from './const';
import { ERC20 } from "../../generated/Crypto Market/ERC20";

import { Synth as SynthTemplate } from "../../generated/templates";
import { PoolDayData, SynthDayData, CollateralDayData } from '../../generated/schema';

export function gocProtocol(): Protocol {
	let protocol = Protocol.load("1");
	if (protocol == null) {
		protocol = new Protocol("1");
		protocol.paused = false;
		protocol.l0Admin = new Array<string>();
		protocol.l1Admin = new Array<string>();
		protocol.l2Admin = new Array<string>();
		protocol.save();
	}
	return protocol as Protocol;
}

export function gocPool(id: string): Pool {
	let pool = Pool.load(id);
	if (pool == null) {
		pool = new Pool(id);
		pool.protocol = "1";

		pool.feeToken = ADDRESS_ZERO.toHex();
		pool.issuerAlloc = ZERO_BI;
		pool.oracle = ADDRESS_ZERO.toHex();
		pool.fallbackOracle = ADDRESS_ZERO.toHex();
		pool.paused = false;

		pool.totalSupply = ZERO_BI;
		pool.totalDebtUSD = ZERO_BD;
		pool.totalVolumeUSD = ZERO_BD;

		pool.rewardTokens = new Array<string>();
		pool.rewardSpeeds = new Array<BigInt>();
		pool.synthIds = new Array<string>();
		pool.collateralIds = new Array<string>();
		pool.totalRevenueUSD = ZERO_BD;
		pool.totalBurnUSD = ZERO_BD;

		const poolContract = ERC20.bind(Address.fromString(id));
		const name = poolContract.try_name();
		if (!name.reverted) {
			pool.name = name.value;
		}
		const symbol = poolContract.try_symbol();
		if (!symbol.reverted) {
			pool.symbol = symbol.value;
		}
		pool.save();
	}
	return pool as Pool;
}

export function gocSynth(id: string, pool: Pool|null, event: ethereum.Event): Synth {
	let synth = Synth.load(id);
	if (synth == null) {
		synth = new Synth(id);

		synth.isActive = true;
		synth.isDisabled = false;
		synth.pool = ADDRESS_ZERO.toHex();
		synth.mintFee = ZERO_BI;
		synth.burnFee = ZERO_BI;
		synth.token = gocToken(id).id;
		synth.priceUSD = ZERO_BD;
		synth.lastPriceUpdate = 0;
		synth.isFeeToken = false;

		synth.cumulativeMinted = ZERO_BI;
		synth.cumulativeBurned = ZERO_BI;
		synth.totalSupply = ZERO_BI;

		if (pool) {
			let _synthIds = pool.synthIds;
			_synthIds.push(id);
			pool.synthIds = _synthIds;
		}

		synth.createdAt = event.block.timestamp.toI32();

		synth.save();
		SynthTemplate.create(Address.fromString(id));
	}
	return synth as Synth;
}

export function gocToken(id: string): Token {
	let token = Token.load(id);
	if (token == null) {
		token = new Token(id);
		token.name = "Unknown Token Name";
		token.symbol = "UNKNOWN";
		token.decimals = 18;

		if (id == ETH_ADDRESS.toHex()) {
			token.name = "Ethereum";
			token.symbol = "ETH";
			token.decimals = 18;
		} else {
			const tokenContract = ERC20.bind(Address.fromString(id));
			const name = tokenContract.try_name();
			if (!name.reverted) {
				token.name = name.value;
			}
			if(token.name == "Wrapped Ether") token.name = "Ethereum";
			const symbol = tokenContract.try_symbol();
			if (!symbol.reverted) {
				token.symbol = symbol.value;
			}
			if(token.symbol == "WETH") token.symbol = "ETH";
			const decimals = tokenContract.try_decimals();
			if (!decimals.reverted) {
				token.decimals = decimals.value;
			}
		}

		token.save();
	}
	return token as Token;
}

export function gocCollateral(id: string, pool: Pool, event: ethereum.Event): Collateral {
	const _id = id + "-" + pool.id;
	let collateral = Collateral.load(_id);
	if (collateral == null) {
		collateral = new Collateral(_id);
		collateral.pool = pool.id;
		collateral.token = gocToken(id).id;
		collateral.isPermit = false;
		// const erc20Contract = ERC20.bind(Address.fromString(id));
		// const nonce = erc20Contract.try_nonces(Address.fromString(pool.id));
		// if (!nonce.reverted) {
		// 	collateral.isPermit = true;
		// }

		collateral.isActive = true;
		collateral.cap = ZERO_BI;
		collateral.baseLTV = 0;
		collateral.liqThreshold = 0;
		collateral.totalPositions = 0;
		collateral.cumulativeEnteredPositions = 0;
		collateral.cumulativeExitedPositions = 0;

		collateral.totalDeposits = ZERO_BI;
		collateral.cumulativeDeposits = ZERO_BI;
		collateral.cumulativeWithdrawals = ZERO_BI;

		collateral.priceUSD = ZERO_BD;
		collateral.lastPriceUpdate = 0;

		collateral.createdAt = event.block.timestamp.toI32();

		let _collateralIds = pool.collateralIds;
		_collateralIds.push(_id);
		pool.collateralIds = _collateralIds;
		collateral.save();
	}
	return collateral as Collateral;
}

export function gocAccount(id: string, event:ethereum.Event ): Account {
	let account = Account.load(id);
	if (account == null) {
		account = new Account(id);
		account.createdAt = event.block.timestamp
		account.totalPoint = ZERO_BD;
		account.referredEarnedUSD = ZERO_BD;
		account	.referredVolumeUSD = ZERO_BD;
		account.totalMintUSD = ZERO_BD;
		account.totalBurnUSD = ZERO_BD;
		account.firstTxnRevenueUSD = ZERO_BD;
		account.referredBy = ADDRESS_ZERO.toHex();
		account.txnCount = 0;
		account.save();
	}
	return account as Account;
}

export function gocAccountPosition(
	account: string,
	pool: string
): AccountPosition {
	const id = account + "-" + pool;
	let accountPosition = AccountPosition.load(id);
	if (accountPosition == null) {
		accountPosition = new AccountPosition(id);
		accountPosition.account = account;
		accountPosition.pool = pool;
		accountPosition.balance = ZERO_BI;
		accountPosition.totalBorrowUSD = ZERO_BD;
		accountPosition.totalRepayUSD = ZERO_BD;
		accountPosition.save();
	}
	return accountPosition as AccountPosition;
}

export function gocAccountBalance(
	accountPosition: string,
	collateral: string
): AccountBalance {
	const id = accountPosition + "-" + collateral;
	let accountBalance = AccountBalance.load(id);
	if (accountBalance == null) {
		accountBalance = new AccountBalance(id);
		accountBalance.accountPosition = accountPosition;
		accountBalance.collateral = collateral;
		accountBalance.balance = ZERO_BI;
		accountBalance.hasEntered = true;
		accountBalance.save();
	}
	return accountBalance as AccountBalance;
}

export function gocPoolDayData(
	pool: Pool,
	event: ethereum.Event,
): PoolDayData {
	let id = pool.id + "-" + (event.block.timestamp.toI32() / 86400).toString();
	let poolDayData = PoolDayData.load(id);
	if (poolDayData == null) {
		poolDayData = new PoolDayData(id);
		poolDayData.pool = pool.id;
		poolDayData.dayId = event.block.timestamp.toI32() / 86400;
		poolDayData.totalDebtUSD = ZERO_BD;
		poolDayData.totalSupply = ZERO_BI;
		poolDayData.dailyRevenueUSD = ZERO_BD;
		poolDayData.dailyBurnUSD = ZERO_BD;
		poolDayData.totalRevenueUSD = ZERO_BD;
		poolDayData.totalBurnUSD = ZERO_BD;
		poolDayData.dailyDebtIssuedUSD = ZERO_BD;
		poolDayData.dailyDebtBurnedUSD = ZERO_BD;
		poolDayData.save();
	}
	poolDayData.totalSupply = pool.totalSupply;
	poolDayData.totalDebtUSD = pool.totalDebtUSD;
	poolDayData.totalRevenueUSD = pool.totalRevenueUSD;
	poolDayData.totalBurnUSD = pool.totalBurnUSD;
	return poolDayData as PoolDayData;
}

export function gocSynthDayData(
	synth: Synth,
	event: ethereum.Event,
): SynthDayData {
	let id = synth.id + "-" + (event.block.timestamp.toI32() / 86400).toString();
	let synthDayData = SynthDayData.load(id);
	if (synthDayData == null) {
		synthDayData = new SynthDayData(id);
		synthDayData.synth = synth.id;
		synthDayData.dayId = event.block.timestamp.toI32() / 86400;
		synthDayData.totalSupply = ZERO_BI;
		synthDayData.cumulativeMinted = ZERO_BI;
		synthDayData.cumulativeBurned = ZERO_BI;
		synthDayData.dailyMinted = ZERO_BI;
		synthDayData.dailyBurned = ZERO_BI;
		synthDayData.save();
	}
	synthDayData.totalSupply = synth.totalSupply;
	synthDayData.cumulativeMinted = synth.cumulativeMinted;
	synthDayData.cumulativeBurned = synth.cumulativeBurned;

	return synthDayData as SynthDayData;
}

export function gocCollateralDayData(
	collateral: Collateral,
	event: ethereum.Event,
): CollateralDayData {
	let id = collateral.id + "-" + (event.block.timestamp.toI32() / 86400).toString();
	let collateralDayData = CollateralDayData.load(id);
	if (collateralDayData == null) {
		collateralDayData = new CollateralDayData(id);
		collateralDayData.collateral = collateral.id;
		collateralDayData.dayId = event.block.timestamp.toI32() / 86400;
		collateralDayData.totalDeposits = ZERO_BI;
		collateralDayData.dailyDeposits = ZERO_BI;
		collateralDayData.dailyWithdrawals = ZERO_BI;
		collateralDayData.cumulativeDeposits = ZERO_BI;
		collateralDayData.cumulativeWithdrawals = ZERO_BI;
		collateralDayData.save();
	}
	collateralDayData.totalDeposits = collateral.totalDeposits;
	collateralDayData.cumulativeDeposits = collateral.cumulativeDeposits;
	collateralDayData.cumulativeWithdrawals = collateral.cumulativeWithdrawals;

	return collateralDayData as CollateralDayData;
}

export function gocBorrow
	(event: ethereum.Event,
		accountPosition: string
	): Borrow {
	let id = event.transaction.hash.toHexString().concat(event.logIndex.toString());
	let borrow = Borrow.load(id);
	if (borrow == null) {
		borrow = new Borrow(id);
		borrow.amount = ZERO_BD;
		borrow.accountPosition = accountPosition;
		borrow.totalSupply = ZERO_BD;
		borrow.totalDebtUSD = ZERO_BD;
		borrow.save();
	}
	return borrow as Borrow
}

export function gocRepay
	(event: ethereum.Event,
		accountPosition: string
	): Repay {
	let id = event.transaction.hash.toHexString().concat(event.logIndex.toString());
	let repay = Repay.load(id);
	if (repay == null) {
		repay = new Repay(id);
		repay.amount = ZERO_BD;
		repay.accountPosition = accountPosition;
		repay.totalSupply = ZERO_BD;
		repay.totalDebtUSD = ZERO_BD;
		repay.save();
	}
	return repay as Repay
}

export function gocMint
	(
		event: ethereum.Event,
		synth: string,
		account: string
	): Mint {
	let id = event.transaction.hash.toHexString().concat(event.logIndex.toString());
	let mint = Mint.load(id);
	if (mint == null) {
		mint = new Mint(id);
		mint.account = account;
		mint.amount = ZERO_BD;
		mint.priceUSD = ZERO_BD;
		mint.synth = synth;
	}
	return mint as Mint
}

export function gocBurn
	(
		event: ethereum.Event,
		synth: string,
		account: string
	): Burn {
	let id = event.transaction.hash.toHexString().concat(event.logIndex.toString());
	let burn = Burn.load(id);
	if (burn == null) {
		burn = new Burn(id);
		burn.account = account;
		burn.amount = ZERO_BD;
		burn.priceUSD = ZERO_BD;
		burn.synth = synth;
	}
	return burn as Burn
}

export function gocAccountDayData(
	event: ethereum.Event,
	account: string
): AccountDayData {
	let id = account + "-" + (event.block.timestamp.toI32() / 86400).toString();
	let accountDayData = AccountDayData.load(id);
	if (accountDayData == null) {
		accountDayData = new AccountDayData(id);
		accountDayData.dayId = event.block.timestamp.toI32() / 86400;
		accountDayData.account = account;
		accountDayData.dailyPoint = ZERO_BD;
		accountDayData.dailyMintedUSD = ZERO_BD;
		accountDayData.dailyBurnedUSD = ZERO_BD;
	}

	return accountDayData as AccountDayData
}

export function gocAccountPositionDayData(
	event: ethereum.Event,
	accountPosition: AccountPosition
): AccountPositionDayData {
	let id = accountPosition.id + "-" + (event.block.timestamp.toI32() / 86400).toString();
	let accountPositionDayData = AccountPositionDayData.load(id);
	if (accountPositionDayData == null) {
		accountPositionDayData = new AccountPositionDayData(id);
		accountPositionDayData.dayId = event.block.timestamp.toI32() / 86400;
		accountPositionDayData.accountPosition = accountPosition.id;
		accountPositionDayData.dailyBalance = ZERO_BI
	}
	accountPositionDayData.dailyBalance = accountPosition.balance;
	return accountPositionDayData as AccountPositionDayData;
}

export function gocPoolHrData(
	pool: Pool,
	event: ethereum.Event,
): PoolHrData {
	let id = pool.id + "-" + (event.block.timestamp.toI32() / 3600).toString();
	let poolHrData = PoolHrData.load(id);
	if (poolHrData == null) {
		poolHrData = new PoolHrData(id);
		poolHrData.pool = pool.id;
		poolHrData.hrId = event.block.timestamp.toI32() / 3600;
		poolHrData.totalDebtUSD = ZERO_BD;
		poolHrData.totalSupply = ZERO_BI;
		poolHrData.hrRevenueUSD = ZERO_BD;
		poolHrData.hrBurnUSD = ZERO_BD;
		poolHrData.totalRevenueUSD = ZERO_BD;
		poolHrData.totalBurnUSD = ZERO_BD;
		poolHrData.hrDebtIssuedUSD = ZERO_BD;
		poolHrData.hrDebtBurnedUSD = ZERO_BD;
		poolHrData.save();
	}
	poolHrData.totalSupply = pool.totalSupply;
	poolHrData.totalDebtUSD = pool.totalDebtUSD;
	poolHrData.totalRevenueUSD = pool.totalRevenueUSD;
	poolHrData.totalBurnUSD = pool.totalBurnUSD;
	return poolHrData as PoolHrData;
}

export function gocAccountPositionHrData(
	event: ethereum.Event,
	accountPosition: AccountPosition
): AccountPositionHrData
{
	let id = accountPosition.id + "-" + (event.block.timestamp.toI32() / 3600).toString();
	let accountPositionHrData = AccountPositionHrData.load(id);
	if (accountPositionHrData == null) {
		accountPositionHrData = new AccountPositionHrData(id);
		accountPositionHrData.hrId = event.block.timestamp.toI32() / 3600;
		accountPositionHrData.accountPosition = accountPosition.id;
		accountPositionHrData.hrBalance = ZERO_BI
	}
	accountPositionHrData.hrBalance = accountPosition.balance
	return accountPositionHrData as AccountPositionHrData;
}