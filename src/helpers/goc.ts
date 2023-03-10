import { Address, Bytes, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
	Pool,
	Protocol,
	Synth,
	Collateral,
	Account,
	AccountPosition,
	AccountBalance,
	Token,
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
		pool.paused = false;

		pool.totalSupply = ZERO_BI;
		pool.totalDebtUSD = ZERO_BD;

		pool.rewardTokens = new Array<string>();
		pool.rewardSpeeds = new Array<BigInt>();
		pool.synthIds = new Array<string>();

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

export function gocSynth(id: string, pool: Pool|null = null): Synth {
	let synth = Synth.load(id);
	if (synth == null) {
		synth = new Synth(id);

		synth.isEnabled = false;
		synth.pool = ADDRESS_ZERO.toHex();
		synth.mintFee = ZERO_BI;
		synth.burnFee = ZERO_BI;
		synth.token = gocToken(id).id;
		synth.priceUSD = ZERO_BD;
		synth.lastPriceUpdate = 0;

		synth.cumulativeMinted = ZERO_BI;
		synth.cumulativeBurned = ZERO_BI;
		synth.totalSupply = ZERO_BI;

		if(pool){
			let _synthIds = pool.synthIds;
			_synthIds.push(id);
			pool.synthIds = _synthIds;
		}

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
			const symbol = tokenContract.try_symbol();
			if (!symbol.reverted) {
				token.symbol = symbol.value;
			}
			const decimals = tokenContract.try_decimals();
			if (!decimals.reverted) {
				token.decimals = decimals.value;
			}
		}

		token.save();
	}
	return token as Token;
}

export function gocCollateral(id: string, pool: Pool): Collateral {
	const _id = id + "-" + pool.id;
	let collateral = Collateral.load(_id);
	if (collateral == null) {
		collateral = new Collateral(_id);
		collateral.pool = pool.id;
		collateral.token = gocToken(id).id;

		collateral.isEnabled = false;
		collateral.cap = ZERO_BI;
		collateral.baseLTV = 0;
		collateral.liqThreshold = 0;
		collateral.liqBonus = 0;

		collateral.totalDeposits = ZERO_BI;
		collateral.cumulativeDeposits = ZERO_BI;
		collateral.cumulativeWithdrawals = ZERO_BI;

		collateral.priceUSD = ZERO_BD;
		collateral.lastPriceUpdate = 0;

		let _collateralIds = pool.collateralIds;
		_collateralIds.push(_id);
		pool.collateralIds = _collateralIds;
		collateral.save();
	}
	return collateral as Collateral;
}

export function gocAccount(id: string): Account {
	let account = Account.load(id);
	if (account == null) {
		account = new Account(id);
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