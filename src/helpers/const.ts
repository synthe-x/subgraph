import { Bytes, BigInt, Address } from '@graphprotocol/graph-ts';

export const ONE_BYTE = Bytes.fromI32(1);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BI = BigInt.fromI32(0);
export const ZERO_BD = ZERO_BI.toBigDecimal();
export const ONE_BD = ONE_BI.toBigDecimal();

export const ADDRESS_ZERO = Address.fromHexString("0x0000000000000000000000000000000000000000");
export const ETH_ADDRESS = Address.fromHexString("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")