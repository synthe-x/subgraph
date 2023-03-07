import { Address } from '@graphprotocol/graph-ts';
import { Pool as PoolContract } from '../../../generated/SyntheX/Pool';
import { Synth, Pool } from '../../../generated/schema';

export function updatePoolDebt(pool: Pool): Pool {
    const poolContract = PoolContract.bind(Address.fromString(pool.id));
    const totalDebt = poolContract.try_getTotalDebtUSD()
    if(!totalDebt.reverted) {
        pool.totalDebtUSD = totalDebt.value;
    }
    return pool;
}