import { Transfer } from "../generated/Crypto Market/ERC20";
import { ADDRESS_ZERO, BASIS_POINTS, PRICE_DECIMALS, BASIS_POINTS_BD } from './helpers/const';
import { gocToken, gocSynth, gocPool, gocAccount, gocPoolDayData, gocSynthDayData } from './helpers/goc';
import { updatePoolDebt } from "./helpers/update/debt";
import { getTokenPrice, updatePoolPrices } from './helpers/update/price';

export function handleTransfer(event: Transfer): void {
    if(event.params.from.equals(ADDRESS_ZERO)){
        handleMint(event);
    } else if (event.params.to.equals(ADDRESS_ZERO)){
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

    const revenueUSD = event.params.value.times(synth.mintFee).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD);
    const feeBurnUSD = event.params.value.times(synth.mintFee).times(pool.issuerAlloc).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(BASIS_POINTS_BD);
    poolDayData.dailyRevenueUSD = poolDayData.dailyRevenueUSD.plus(revenueUSD);
    poolDayData.dailyBurnUSD = poolDayData.dailyBurnUSD.plus(feeBurnUSD);

    synthDayData.dailyMinted = synthDayData.dailyMinted.plus(event.params.value);

    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
    poolDayData.save();
    synthDayData.save();
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

    const revenueUSD = event.params.value.times(synth.burnFee).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD);
    const feeBurnUSD = event.params.value.times(synth.burnFee).times(pool.issuerAlloc).toBigDecimal().times(synth.priceUSD).div(BASIS_POINTS_BD).div(BASIS_POINTS_BD);
    poolDayData.dailyRevenueUSD = poolDayData.dailyRevenueUSD.plus(revenueUSD);
    poolDayData.dailyBurnUSD = poolDayData.dailyBurnUSD.plus(feeBurnUSD);

    synthDayData.dailyBurned = synthDayData.dailyBurned.plus(event.params.value);

    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
    poolDayData.save();
    synthDayData.save();
}