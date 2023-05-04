import { Address } from '@graphprotocol/graph-ts';
import { Pool as PoolContract } from '../../../generated/SyntheX/Pool';
import { Synth, Pool } from '../../../generated/schema';
import { ONE_ETH } from '../const';

export function updatePoolDebt(pool: Pool): Pool {
    // const poolContract = PoolContract.bind(Address.fromString(pool.id));
    // const totalDebt = poolContract.try_getTotalDebtUSD()
    // if(!totalDebt.reverted) {
    //     pool.totalDebtUSD = totalDebt.value.divDecimal(ONE_ETH.toBigDecimal());
    // }
    return pool;
}