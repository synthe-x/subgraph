import { BigInt } from "@graphprotocol/graph-ts"
import {
  DistributedReward,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SetPoolRewardSpeed,
  Unpaused
} from "../generated/SyntheX/SyntheX"
import { Protocol } from "../generated/schema"
import { gocPool, gocProtocol, gocToken } from './helpers/goc';

export function handleDistributedReward(event: DistributedReward): void {}

export function handleSetPoolRewardSpeed(event: SetPoolRewardSpeed): void {
  const pool = gocPool(event.params.pool.toHex());
  const rewardToken = gocToken(event.params.rewardToken.toHex());

  let found = false;
  let _rewardTokens = pool.rewardTokens;
  let _rewardSpeeds = pool.rewardSpeeds;
  for(let i = 0; i < _rewardTokens.length; i++){
    if(_rewardTokens[i] == rewardToken.id){
      _rewardSpeeds[i] = event.params.speed;
      found = true;
    }
  }
  if(!found){
    _rewardTokens.push(rewardToken.id);
    _rewardSpeeds.push(event.params.speed);
  }
  pool.rewardTokens = _rewardTokens;
  pool.rewardSpeeds = _rewardSpeeds;

  pool.save();
}

export function handleUnpaused(event: Unpaused): void {
  const protocol = gocProtocol();
  protocol.paused = false;
  protocol.save();
}

export function handlePaused(event: Paused): void {
  const protocol = gocProtocol();
  protocol.paused = true;
  protocol.save();
}

// TODO: Keep track of admins
export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}