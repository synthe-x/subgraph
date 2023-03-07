import { log, store } from "@graphprotocol/graph-ts";
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

import { gocCollateral, gocPool, gocSynth, gocAccountPosition, gocAccount, gocAccountBalance, gocToken } from './helpers/goc';
import { updatePoolDebt } from "./helpers/update/debt";
import { getTokenPrice, updatePoolPrices } from './helpers/update/price';
import { ADDRESS_ZERO } from './helpers/const';

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

    synth.isEnabled = event.params.isEnabled;
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
    collateral.liqBonus = event.params.liqBonus.toI32();
    collateral.liqProtocolFee = event.params.liqProtocolFee.toI32();
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
    if(!accountBalance.hasEntered){
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
    if(accountBalance.hasEntered){
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
    collateral.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    accountBalance.balance = accountBalance.balance.plus(event.params.amount);
    account.save();
    accountPosition.save();
    accountBalance.save();
    collateral.save();
    pool.save();
}

export function handleWithdraw(event: Withdraw): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    let collateral = gocCollateral(event.params.asset.toHex(), pool);
    let account = gocAccount(event.params.user.toHex());
    let accountPosition = gocAccountPosition(event.params.user.toHex(), pool.id);
    let accountBalance = gocAccountBalance(accountPosition.id, collateral.id);
    let token = gocToken(event.params.asset.toHex());

    collateral.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    accountBalance.balance = accountBalance.balance.minus(event.params.amount);
    accountBalance.save();
    collateral.save();
    pool.save();
}

export function handleIssuerAllocUpdated(event: IssuerAllocUpdated): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    pool = updatePoolDebt(pool);
    pool.issuerAlloc = event.params.issuerAlloc.toI32();
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
    pool.feeToken = event.params.feeToken.toHex();
    pool.save();
}

export function handleTransfer(event: Transfer): void {
    let pool = gocPool(event.address.toHex());
    pool = updatePoolPrices(pool);
    if(event.params.from.toHex() == ADDRESS_ZERO.toHex()){
        let accountPosition = gocAccountPosition(event.params.to.toHex(), pool.id);
        pool.totalSupply = pool.totalSupply.plus(event.params.value);
        accountPosition.balance = accountPosition.balance.plus(event.params.value);
        accountPosition.save();
    } else if (event.params.to.toHex() == ADDRESS_ZERO.toHex()){
        let accountPosition = gocAccountPosition(event.params.from.toHex(), pool.id);
        pool.totalSupply = pool.totalSupply.minus(event.params.value);
        accountPosition.balance = accountPosition.balance.minus(event.params.value);
        accountPosition.save();
    } else {
        log.warning("Transfer event from {} to {} with value {}", [event.params.from.toHex(), event.params.to.toHex(), event.params.value.toString()]);
    }
    pool = updatePoolDebt(pool);
    pool.save();
}

