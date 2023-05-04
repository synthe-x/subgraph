import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { PriceOracle } from "../../../generated/SyntheX/PriceOracle";
import { Pool, Token, Collateral, Synth } from '../../../generated/schema';
import { ADDRESS_ZERO, ZERO_BI, PRICE_DECIMALS, ZERO_BD, ETH_ADDRESS } from '../const';

export function getTokenPrice(token: Token, pool: Pool): BigDecimal {
    const oracle = pool.oracle;
    if(oracle == ADDRESS_ZERO.toHex()) return ZERO_BD;
    const oracleContract = PriceOracle.bind(Address.fromString(oracle));
    // const price = oracleContract.try_getAssetPrice(
    //     Address.fromString(token.id)
    // );
    // if (!price.reverted) {
    //     return price.value.toBigDecimal().div(PRICE_DECIMALS.toBigDecimal());
    // } else {
        return ZERO_BD;
    // }
}

export function updatePoolPrices(pool: Pool): Pool {
    const synthIds = pool.synthIds;
    const oracleContract = PriceOracle.bind(Address.fromString(pool.oracle));
    const assets = new Array<Address>();
    for(let i = 0; i < synthIds.length; i++) {
        assets.push(changetype<Address>(Address.fromHexString(synthIds[i])));
    }
    for(let i = 0; i < pool.collateralIds.length; i++) {
        const collateral = Collateral.load(pool.collateralIds[i]);
        if(collateral == null) continue;
        assets.push(changetype<Address>(Address.fromHexString(collateral.token)));
    }
    // const prices = oracleContract.try_getAssetsPrices(assets);
    // if (!prices.reverted) {
    //     for(let i = 0; i < synthIds.length; i++) {
    //         const synth = Synth.load(synthIds[i]);
    //         if(synth == null) continue;
    //         synth.priceUSD = prices.value[i].toBigDecimal().div(PRICE_DECIMALS.toBigDecimal());
    //         synth.save();
    //     }
    //     for(let i = 0; i < pool.collateralIds.length; i++) {
    //         const collateral = Collateral.load(pool.collateralIds[i]);
    //         if(collateral == null) continue;
    //         collateral.priceUSD = prices.value[i + synthIds.length].toBigDecimal().div(PRICE_DECIMALS.toBigDecimal());
    //         collateral.save();
    //     }
    // }
    return pool;
}