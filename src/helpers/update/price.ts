import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { PriceOracle } from "../../../generated/SyntheX/PriceOracle";
import { Pool, Token, Collateral, Synth } from '../../../generated/schema';
import { ADDRESS_ZERO, ZERO_BI, PRICE_DECIMALS, ZERO_BD } from '../const';

export function getTokenPrice(token: Token, pool: Pool): BigDecimal {
    const oracle = pool.oracle;
    if(oracle == ADDRESS_ZERO.toHex()) return ZERO_BD;
    const oracleContract = PriceOracle.bind(Address.fromString(oracle));
    const price = oracleContract.try_getAssetPrice(
        Address.fromString(token.id)
    );
    if (!price.reverted) {
        return price.value.toBigDecimal().div(PRICE_DECIMALS.toBigDecimal());
    } else {
        return ZERO_BD;
    }
}

export function updatePoolPrices(pool: Pool): Pool {
    const synthIds = pool.synthIds;
    for (let i = 0; i < synthIds.length; i++) {
        const synth = Synth.load(synthIds[i]);
        if (synth == null) continue;
        const token = Token.load(synth.token);
        if (token == null) continue;
        const price = getTokenPrice(token as Token, pool);
        synth.priceUSD = price;
        synth.save();
    }
    for(let i = 0; i < pool.collateralIds.length; i++){
        const collateral = Collateral.load(pool.collateralIds[i]);
        if(collateral == null) continue;
        const token = Token.load(collateral.token);
        if(token == null) continue;
        const price = getTokenPrice(token as Token, pool);
        collateral.priceUSD = price;
        collateral.save();
    }
    return pool;
}