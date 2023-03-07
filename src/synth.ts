import { Transfer } from "../generated/Crypto Market/ERC20";
import { ADDRESS_ZERO } from './helpers/const';
import { gocToken, gocSynth, gocPool, gocAccount } from './helpers/goc';
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
    synth.priceUSD = getTokenPrice(token, pool);

    pool = updatePoolDebt(pool);

    token.totalSupply = token.totalSupply.plus(event.params.value);
    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
}

function handleBurn(event: Transfer): void {
    const token = gocToken(event.address.toHex());
    let synth = gocSynth(event.address.toHex());
    let pool = gocPool(synth.pool);
    synth.priceUSD = getTokenPrice(token, pool);
    pool = updatePoolDebt(pool);

    token.totalSupply = token.totalSupply.minus(event.params.value);
    synth.save();
    token.save();
    pool = updatePoolPrices(pool);
    pool.save();
}