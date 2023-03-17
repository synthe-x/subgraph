import { log, store, BigDecimal } from '@graphprotocol/graph-ts';
import {
    Paused,
    Unpaused,
    SynthUpdated,
    SynthRemoved,
    CollateralParamsUpdated,
    CollateralEntered,
    CollateralExited,
    Deposit,
    Withdraw,
    IssuerAllocUpdated,
    PriceOracleUpdated,
    FeeTokenUpdated,
    Transfer
} from "../generated/Crypto Market/Pool"

import { gocCollateral, gocPool, gocSynth, gocAccountPosition, gocAccount, gocAccountBalance, gocToken, gocCollateralDayData, gocPoolDayData, gocBorrow, gocRepay } from './helpers/goc';
import { updatePoolDebt } from "./helpers/update/debt";
import { getTokenPrice, updatePoolPrices } from './helpers/update/price';
import { ADDRESS_ZERO, ZERO_BI } from './helpers/const';
import { Account } from '../generated/schema';
import { Liquidate } from '../generated/SyntheX/Pool';

export function handlePaused(event: Paused): void {
    let pool = gocPool(event.address.toHex());
    pool.paused = true;
    pool.save();
}

export function handleUnpaused(event: Unpaused): void {
    let pool = gocPool(event.address.toHex());
    pool.paused = false;
    pool.save();
}

export function handleSynthUpdated(event: SynthUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let synth = gocSynth(event.params.synth.toHex(), pool);
    let token = gocToken(event.params.synth.toHex());

    synth.pool = pool.id;
    synth.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    synth.isDisabled = event.params.isDisabled;
    synth.isActive = event.params.isActive;
    synth.mintFee = event.params.mintFee;
    synth.burnFee = event.params.burnFee;
    synth.save();
    pool.save();
}

export function handleSynthRemoved(event: SynthRemoved): void {
    // delete synth
    store.remove("Synth", event.params.synth.toHex());
}

export function handleCollateralParamsUpdated(event: CollateralParamsUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.asset.toHex(), pool);
    let token = gocToken(event.params.asset.toHex());

    collateral.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    collateral.cap = event.params.cap;
    collateral.baseLTV = event.params.baseLTV.toI32();
    collateral.liqThreshold = event.params.liqThreshold.toI32();
    collateral.save();
    pool.save();
}

export function handleCollateralEntered(event: CollateralEntered): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.collateral.toHex(), pool);
    let account = gocAccount(event.params.user.toHex());
    let accountPosition = gocAccountPosition(event.params.user.toHex(), pool.id);
    let accountBalance = gocAccountBalance(accountPosition.id, collateral.id);
    let token = gocToken(event.params.collateral.toHex());

    collateral.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    // if entering 
    if (!accountBalance.hasEntered) {
        collateral.totalPositions += 1;
    }
    collateral.cumulativeEnteredPositions += 1;
    accountBalance.hasEntered = true;

    account.save();
    accountPosition.save();
    accountBalance.save();
    collateral.save();
    pool.save();
}

export function handleCollateralExited(event: CollateralExited): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.collateral.toHex(), pool);
    let account = gocAccount(event.params.user.toHex());
    let accountPosition = gocAccountPosition(event.params.user.toHex(), pool.id);
    let accountBalance = gocAccountBalance(accountPosition.id, collateral.id);
    let token = gocToken(event.params.collateral.toHex());

    collateral.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    // if exiting
    if (accountBalance.hasEntered) {
        collateral.totalPositions -= 1;
    }
    collateral.cumulativeExitedPositions += 1;
    accountBalance.hasEntered = false;
    accountBalance.save();
    collateral.save();
    pool.save();
}

export function handleDeposit(event: Deposit): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.asset.toHex(), pool);
    let token = gocToken(event.params.asset.toHex());
    let account = gocAccount(event.params.user.toHex());
    let accountPosition = gocAccountPosition(event.params.user.toHex(), pool.id);
    let accountBalance = gocAccountBalance(accountPosition.id, collateral.id);

    collateral.totalDeposits = collateral.totalDeposits.plus(event.params.amount);
    collateral.cumulativeDeposits = collateral.cumulativeDeposits.plus(event.params.amount);

    accountBalance.balance = accountBalance.balance.plus(event.params.amount);

    let collateralDayData = gocCollateralDayData(collateral, event);
    collateralDayData.dailyDeposits = collateralDayData.dailyDeposits.plus(event.params.amount);

    account.save();
    accountPosition.save();
    accountBalance.save();
    collateral.save();
    pool.save();
    collateralDayData.save();
}

export function handleWithdraw(event: Withdraw): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.asset.toHex(), pool);
    let account = gocAccount(event.params.user.toHex());
    let accountPosition = gocAccountPosition(event.params.user.toHex(), pool.id);
    let accountBalance = gocAccountBalance(accountPosition.id, collateral.id);
    let token = gocToken(event.params.asset.toHex());

    collateral.totalDeposits = collateral.totalDeposits.minus(event.params.amount);
    collateral.cumulativeWithdrawals = collateral.cumulativeWithdrawals.plus(event.params.amount);

    accountBalance.balance = accountBalance.balance.minus(event.params.amount);

    let collateralDayData = gocCollateralDayData(collateral, event);
    collateralDayData.dailyWithdrawals = collateralDayData.dailyWithdrawals.plus(event.params.amount);

    accountBalance.save();
    collateral.save();
    pool.save();
}

export function handleIssuerAllocUpdated(event: IssuerAllocUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    pool = updatePoolDebt(pool);
    pool.issuerAlloc = event.params.issuerAlloc;
    pool.save();
}

export function handlePriceOracleUpdated(event: PriceOracleUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolDebt(pool);
    pool.oracle = event.params.priceOracle.toHex();
    pool.save();
}

export function handleFeeTokenUpdated(event: FeeTokenUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    pool = updatePoolDebt(pool);
    pool.feeToken = gocSynth(event.params.feeToken.toHex()).id;
    pool.save();
}

export function handleTransfer(event: Transfer): void {
    if (event.params.from.toHex() == ADDRESS_ZERO.toHex()) {
        handleMint(event);
    } else if (event.params.to.toHex() == ADDRESS_ZERO.toHex()) {
        handleBurn(event);
    } else {
        log.warning("Transfer event from {} to {} with value {}", [event.params.from.toHex(), event.params.to.toHex(), event.params.value.toString()]);
    }
}

function handleMint(event: Transfer): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let accountPosition = gocAccountPosition(event.params.to.toHex(), pool.id);

    let amountUSD = event.params.value.toBigDecimal();
    if (pool.totalSupply.gt(ZERO_BI)) {
        amountUSD = amountUSD.div(pool.totalSupply.toBigDecimal()).times(pool.totalDebtUSD);
    }
    pool.totalSupply = pool.totalSupply.plus(event.params.value);
    accountPosition.balance = accountPosition.balance.plus(event.params.value);
   
    pool = updatePoolDebt(pool);
    let poolDayData = gocPoolDayData(pool, event);
    poolDayData.dailyDebtIssuedUSD = poolDayData.dailyDebtIssuedUSD.plus(event.params.value.toBigDecimal().div(pool.totalSupply.toBigDecimal()).times(pool.totalDebtUSD));
    poolDayData.save();
    pool.save();

    let borrow = gocBorrow(event, accountPosition.id);
    borrow.amount = event.params.value.toBigDecimal();
    borrow.totalSupply = pool.totalSupply.toBigDecimal();
    borrow.totalDebtUSD = pool.totalDebtUSD;
    accountPosition.totalBorrowUSD = accountPosition.totalBorrowUSD.plus(borrow.amount.div(borrow.totalSupply).times(borrow.totalDebtUSD));
    borrow.save()
    accountPosition.save();
}

function handleBurn(event: Transfer): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let accountPosition = gocAccountPosition(event.params.from.toHex(), pool.id);
    let amountUSD = event.params.value.toBigDecimal().div(pool.totalSupply.toBigDecimal()).times(pool.totalDebtUSD);
    
    let repay = gocRepay(event, accountPosition.id);
    repay.amount = event.params.value.toBigDecimal();
    repay.totalSupply = pool.totalSupply.toBigDecimal();
    repay.totalDebtUSD = pool.totalDebtUSD;

    pool.totalSupply = pool.totalSupply.minus(event.params.value);
    accountPosition.balance = accountPosition.balance.minus(event.params.value);

    pool = updatePoolDebt(pool);
    let poolDayData = gocPoolDayData(pool, event);
    poolDayData.dailyDebtBurnedUSD = poolDayData.dailyDebtBurnedUSD.plus(amountUSD);
    accountPosition.totalRepayUSD = accountPosition.totalRepayUSD.plus(amountUSD);
    poolDayData.save();                                                                                           
    pool.save();
    repay.save()
    accountPosition.save();
}

export function handleLiquidate(event: Liquidate): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.outAsset.toHex(), pool);

    let liquidatorPosition = gocAccountPosition(event.params.liquidator.toHex(), pool.id);
    let liquidatorBalance = gocAccountBalance(liquidatorPosition.id, collateral.id);

    let liquidateePosition = gocAccountPosition(event.params.account.toHex(), pool.id);
    let liquidateeBalance = gocAccountBalance(liquidateePosition.id, collateral.id);

    liquidatorBalance.balance = liquidatorBalance.balance.plus(event.params.outAmount.plus(event.params.outPenalty));
    liquidatorBalance.save();
    liquidateeBalance.balance = liquidateeBalance.balance.minus(event.params.outAmount.plus(event.params.outPenalty).plus(event.params.outRefund));
    liquidateeBalance.save();

    pool.save();
}