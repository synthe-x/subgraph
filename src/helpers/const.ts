import { Bytes, BigInt, Address, BigDecimal } from '@graphprotocol/graph-ts';

export const ONE_BYTE = Bytes.fromI32(1);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BI = BigInt.fromI32(0);
export const ZERO_BD = ZERO_BI.toBigDecimal();
export const ONE_BD = ONE_BI.toBigDecimal();

export const ONE_ETH = BigInt.fromString('1000000000000000000');

export const ADDRESS_ZERO = Address.fromHexString("0x0000000000000000000000000000000000000000");
export const ETH_ADDRESS = Address.fromHexString("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");

export const BASIS_POINTS = BigInt.fromString('10000');
export const BASIS_POINTS_BD = BASIS_POINTS.toBigDecimal();

export const PRICE_DECIMALS = BigInt.fromString('100000000');
export const TO_ETH_BD = BigDecimal.fromString("1000000000000000000");


const ONE_WEEK: BigDecimal = BigDecimal.fromString("604800");
const START_DATE: BigDecimal = BigDecimal.fromString("1680287400");


export function rate(timestamp: BigDecimal): BigDecimal {

    let rate = BigDecimal.fromString("0.016");

    let a = timestamp.minus(START_DATE).div(ONE_WEEK);
    if (a.lt(BigDecimal.fromString("1"))) {
        a = BigDecimal.fromString("1")
    }
    rate = rate.div(a)
    if (rate.lt(BigDecimal.fromString("0.001"))) {
        rate = BigDecimal.fromString("0.001")
    }
    return rate
}