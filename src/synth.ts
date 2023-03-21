import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/Crypto Market/ERC20";
import { ADDRESS_ZERO, BASIS_POINTS, PRICE_DECIMALS, BASIS_POINTS_BD, rate, TO_ETH_BD, ZERO_BD } from './helpers/const';
import { gocToken, gocSynth, gocPool, gocPoolDayData, gocAccount, gocSynthDayData, gocMint, gocBurn, gocAccountDayData, gocPoolHrData } from './helpers/goc';
import { updatePoolDebt } from "./helpers/update/debt";
import { getTokenPrice, updatePoolPrices } from './helpers/update/price';
import { Referred } from "../generated/templates/Synth/Synth"
import { Account } from "../generated/schema";
export function handleTransfer(event: Transfer): void {
    if (event.params.from.equals(ADDRESS_ZERO)) {
        handleMint(event);
    } else if (event.params.to.equals(ADDRESS_ZERO)) {
        handleBurn(event);
    }
}

function handleMint(event: Transfer): void {
    const token = gocToken(event.address.toHex());
    let synth = gocSynth(event.address.toHex());
    let pool = gocPool(synth.pool);
    pool = updatePoolDebt(pool);
    synth.priceUSD = getTokenPrice(token, pool);

    synth.totalSupply = synth.totalSupply.plus(event.params.value);

    let poolDayData = gocPoolDayData(pool, event);
    let synthDayData = gocSynthDayData(synth, event);

    const revenueUSD = event.params.value.times(synth.mintFee).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(TO_ETH_BD);
    const feeBurnUSD = event.params.value.times(synth.mintFee).times(pool.issuerAlloc).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(BASIS_POINTS_BD).div(TO_ETH_BD);

    pool.totalRevenueUSD = pool.totalRevenueUSD.plus(revenueUSD);
    pool.totalBurnUSD = pool.totalBurnUSD.plus(feeBurnUSD);

    poolDayData.dailyRevenueUSD = poolDayData.dailyRevenueUSD.plus(revenueUSD);
    poolDayData.dailyBurnUSD = poolDayData.dailyBurnUSD.plus(feeBurnUSD);
    poolDayData.totalRevenueUSD = pool.totalRevenueUSD;
    poolDayData.totalBurnUSD = pool.totalBurnUSD;

    let poolHrData = gocPoolHrData(pool, event);

    poolHrData.hrRevenueUSD = poolHrData.hrRevenueUSD.plus(revenueUSD);
    poolHrData.hrBurnUSD = poolHrData.hrBurnUSD.plus(feeBurnUSD);
    poolHrData.totalRevenueUSD = pool.totalRevenueUSD;
    poolHrData.totalBurnUSD = pool.totalBurnUSD;

    synthDayData.dailyMinted = synthDayData.dailyMinted.plus(event.params.value);

    let mint = gocMint(event, synth.id, event.params.to.toHex());
    mint.amount = event.params.value.toBigDecimal().div(TO_ETH_BD);
    mint.priceUSD = synth.priceUSD;

    let account = gocAccount(event.params.to.toHex(), event);
    let newPoint = event.params.value.toBigDecimal().div(TO_ETH_BD).times(synth.priceUSD).times(rate(event.block.timestamp.toBigDecimal()));
    account.totalPoint = account.totalPoint.plus(newPoint);
    account.totalMintUSD = account.totalMintUSD.plus(mint.amount.times(synth.priceUSD));

    let accountDayData = gocAccountDayData(event, account.id);
    accountDayData.dailyMintedUSD = accountDayData.dailyMintedUSD.plus(mint.amount.times(synth.priceUSD));
    accountDayData.dailyPoint = accountDayData.dailyPoint.plus(newPoint);

    if (account.txnCount == 0) {
        account.firstTxnRevenueUSD = revenueUSD;
    }

    if (Address.fromHexString(account.referredBy).notEqual(Address.fromHexString(ADDRESS_ZERO.toHex()))) {
        let refAccount = Account.load(account.referredBy);
        if (refAccount) {

            refAccount.referredEarnedUSD = refAccount.referredEarnedUSD.plus(revenueUSD.times(BigDecimal.fromString("0.1")));
            refAccount.referredVolumeUSD = refAccount.referredVolumeUSD.plus(mint.amount.times(synth.priceUSD))
            refAccount.save()
        }
    }
    account.txnCount = account.txnCount + 1;
    accountDayData.save();
    account.save();
    mint.save()
    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
    poolDayData.save();
    synthDayData.save();
    poolHrData.save();
}

function handleBurn(event: Transfer): void {
    const token = gocToken(event.address.toHex());
    let synth = gocSynth(event.address.toHex());
    let pool = gocPool(synth.pool);
    pool = updatePoolDebt(pool);
    synth.priceUSD = getTokenPrice(token, pool);

    synth.totalSupply = synth.totalSupply.minus(event.params.value);

    let poolDayData = gocPoolDayData(pool, event);
    let synthDayData = gocSynthDayData(synth, event);

    const revenueUSD = event.params.value.times(synth.burnFee).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(TO_ETH_BD);
    const feeBurnUSD = event.params.value.times(synth.burnFee).times(pool.issuerAlloc).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(BASIS_POINTS_BD).div(TO_ETH_BD);

    pool.totalRevenueUSD = pool.totalRevenueUSD.plus(revenueUSD);
    pool.totalBurnUSD = pool.totalBurnUSD.plus(feeBurnUSD);

    poolDayData.dailyRevenueUSD = poolDayData.dailyRevenueUSD.plus(revenueUSD);
    poolDayData.dailyBurnUSD = poolDayData.dailyBurnUSD.plus(feeBurnUSD);
    poolDayData.totalRevenueUSD = pool.totalRevenueUSD;
    poolDayData.totalBurnUSD = pool.totalBurnUSD;

    let poolHrData = gocPoolHrData(pool, event);

    poolHrData.hrRevenueUSD = poolHrData.hrRevenueUSD.plus(revenueUSD);
    poolHrData.hrBurnUSD = poolHrData.hrBurnUSD.plus(feeBurnUSD);
    poolHrData.totalRevenueUSD = pool.totalRevenueUSD;
    poolHrData.totalBurnUSD = pool.totalBurnUSD;

    synthDayData.dailyBurned = synthDayData.dailyBurned.plus(event.params.value);

    let burn = gocBurn(event, synth.id, event.params.from.toHex());
    burn.amount = event.params.value.toBigDecimal().div(TO_ETH_BD);
    burn.priceUSD = synth.priceUSD;

    let account = gocAccount(event.params.from.toHex(), event);
    let newPoint = event.params.value.toBigDecimal().div(TO_ETH_BD).times(synth.priceUSD).times(rate(event.block.timestamp.toBigDecimal()));
    account.totalPoint = account.totalPoint.plus(newPoint);
    account.totalBurnUSD = account.totalBurnUSD.plus(burn.amount.times(synth.priceUSD));

    let accountDayData = gocAccountDayData(event, account.id);
    accountDayData.dailyBurnedUSD = accountDayData.dailyBurnedUSD.plus(burn.amount.times(synth.priceUSD));

    if (account.txnCount == 0) {
        account.firstTxnRevenueUSD = revenueUSD;
    }

    if (Address.fromHexString(account.referredBy).notEqual(Address.fromHexString(ADDRESS_ZERO.toHex()))) {

        let refAccount = Account.load(account.referredBy);
        if (refAccount) {
            refAccount.referredEarnedUSD = refAccount.referredEarnedUSD.plus(revenueUSD.times(BigDecimal.fromString("0.1")));
            refAccount.referredVolumeUSD = refAccount.referredVolumeUSD.plus(burn.amount.times(synth.priceUSD))
            refAccount.save()
        }

    }
    account.txnCount = account.txnCount + 1;
    accountDayData.save();
    account.save();
    burn.save();
    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
    poolDayData.save();
    synthDayData.save();
    poolHrData.save();
}

export function handleReferred(event: Referred): void {

    let account = gocAccount(event.params.account.toHex(), event);

    if (
        account.txnCount <= 1 &&
        event.params.referredBy.toHex() != event.params.account.toHex() &&
        Account.load(event.params.referredBy.toHex()) != null
    ) {

        account.referredBy = event.params.referredBy.toHex();
        account.save();
        let refAccount = Account.load(event.params.referredBy.toHex());
        if (refAccount) {
            refAccount.referredVolumeUSD = refAccount.referredVolumeUSD.plus(account.totalMintUSD.plus(account.totalBurnUSD));
            refAccount.referredEarnedUSD = refAccount.referredEarnedUSD.plus(account.firstTxnRevenueUSD.times(BigDecimal.fromString("0.1")));
            refAccount.save();
        }
    }
}
/*

{
    accounts{
    id
    referredBy
    referredEarnedUSD
    referredVolumeUSD
    txnCount
    totalMintUSD
    totalBurnUSD
    
  }
}

*/


