import { Address, BigInt } from "@graphprotocol/graph-ts";
import { PriceOracle } from "../../../generated/SyntheX/PriceOracle";
import { Pool, Token, Collateral, Synth } from '../../../generated/schema';
import { ADDRESS_ZERO, ZERO_BI } from '../const';

export function getTokenPrice(token: Token, pool: Pool): BigInt {
    const oracle = pool.oracle;
    if(oracle == ADDRESS_ZERO.toHex()) return ZERO_BI;
    const oracleContract = PriceOracle.bind(Address.fromString(oracle));
    const price = oracleContract.try_getAssetPrice(
        Address.fromString(token.id)
    );
    if (!price.reverted) {
        return price.value;
    } else {
        return ZERO_BI;
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