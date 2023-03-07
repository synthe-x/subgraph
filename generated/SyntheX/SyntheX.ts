// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddressUpdated extends ethereum.Event {
  get params(): AddressUpdated__Params {
    return new AddressUpdated__Params(this);
  }
}

export class AddressUpdated__Params {
  _event: AddressUpdated;

  constructor(event: AddressUpdated) {
    this._event = event;
  }

  get key(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get value(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class DistributedReward extends ethereum.Event {
  get params(): DistributedReward__Params {
    return new DistributedReward__Params(this);
  }
}

export class DistributedReward__Params {
  _event: DistributedReward;

  constructor(event: DistributedReward) {
    this._event = event;
  }

  get rewardTokens(): Array<Address> {
    return this._event.parameters[0].value.toAddressArray();
  }

  get pool(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _account(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get accountDelta(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get rewardIndex(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SetPoolRewardSpeed extends ethereum.Event {
  get params(): SetPoolRewardSpeed__Params {
    return new SetPoolRewardSpeed__Params(this);
  }
}

export class SetPoolRewardSpeed__Params {
  _event: SetPoolRewardSpeed;

  constructor(event: SetPoolRewardSpeed) {
    this._event = event;
  }

  get rewardToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pool(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get speed(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class SyntheX__rewardStateResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class SyntheX extends ethereum.SmartContract {
  static bind(address: Address): SyntheX {
    return new SyntheX("SyntheX", address);
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  L1_ADMIN_ROLE(): Bytes {
    let result = super.call("L1_ADMIN_ROLE", "L1_ADMIN_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_L1_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "L1_ADMIN_ROLE",
      "L1_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  L2_ADMIN_ROLE(): Bytes {
    let result = super.call("L2_ADMIN_ROLE", "L2_ADMIN_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_L2_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "L2_ADMIN_ROLE",
      "L2_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  VAULT(): Bytes {
    let result = super.call("VAULT", "VAULT():(bytes32)", []);

    return result[0].toBytes();
  }

  try_VAULT(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("VAULT", "VAULT():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getAddress(_key: Bytes): Address {
    let result = super.call("getAddress", "getAddress(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(_key)
    ]);

    return result[0].toAddress();
  }

  try_getAddress(_key: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall("getAddress", "getAddress(bytes32):(address)", [
      ethereum.Value.fromFixedBytes(_key)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRewardsAccrued(
    _rewardTokens: Array<Address>,
    holder: Address,
    _pools: Array<Address>
  ): Array<BigInt> {
    let result = super.call(
      "getRewardsAccrued",
      "getRewardsAccrued(address[],address,address[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(_rewardTokens),
        ethereum.Value.fromAddress(holder),
        ethereum.Value.fromAddressArray(_pools)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_getRewardsAccrued(
    _rewardTokens: Array<Address>,
    holder: Address,
    _pools: Array<Address>
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getRewardsAccrued",
      "getRewardsAccrued(address[],address,address[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(_rewardTokens),
        ethereum.Value.fromAddress(holder),
        ethereum.Value.fromAddressArray(_pools)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isL0Admin(_account: Address): boolean {
    let result = super.call("isL0Admin", "isL0Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);

    return result[0].toBoolean();
  }

  try_isL0Admin(_account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isL0Admin", "isL0Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isL1Admin(_account: Address): boolean {
    let result = super.call("isL1Admin", "isL1Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);

    return result[0].toBoolean();
  }

  try_isL1Admin(_account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isL1Admin", "isL1Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isL2Admin(_account: Address): boolean {
    let result = super.call("isL2Admin", "isL2Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);

    return result[0].toBoolean();
  }

  try_isL2Admin(_account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isL2Admin", "isL2Admin(address):(bool)", [
      ethereum.Value.fromAddress(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  rewardAccrued(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "rewardAccrued",
      "rewardAccrued(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_rewardAccrued(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardAccrued",
      "rewardAccrued(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardIndex(param0: Address, param1: Address, param2: Address): BigInt {
    let result = super.call(
      "rewardIndex",
      "rewardIndex(address,address,address):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromAddress(param2)
      ]
    );

    return result[0].toBigInt();
  }

  try_rewardIndex(
    param0: Address,
    param1: Address,
    param2: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardIndex",
      "rewardIndex(address,address,address):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromAddress(param2)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardInitialIndex(): BigInt {
    let result = super.call(
      "rewardInitialIndex",
      "rewardInitialIndex():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardInitialIndex(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardInitialIndex",
      "rewardInitialIndex():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardSpeeds(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "rewardSpeeds",
      "rewardSpeeds(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_rewardSpeeds(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardSpeeds",
      "rewardSpeeds(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardState(param0: Address, param1: Address): SyntheX__rewardStateResult {
    let result = super.call(
      "rewardState",
      "rewardState(address,address):(uint224,uint32)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new SyntheX__rewardStateResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_rewardState(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<SyntheX__rewardStateResult> {
    let result = super.tryCall(
      "rewardState",
      "rewardState(address,address):(uint224,uint32)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SyntheX__rewardStateResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  rewardTokens(param0: Address, param1: BigInt): Address {
    let result = super.call(
      "rewardTokens",
      "rewardTokens(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_rewardTokens(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "rewardTokens",
      "rewardTokens(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  vault(): Address {
    let result = super.call("vault", "vault():(address)", []);

    return result[0].toAddress();
  }

  try_vault(): ethereum.CallResult<Address> {
    let result = super.tryCall("vault", "vault():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class __AccessControlList_initCall extends ethereum.Call {
  get inputs(): __AccessControlList_initCall__Inputs {
    return new __AccessControlList_initCall__Inputs(this);
  }

  get outputs(): __AccessControlList_initCall__Outputs {
    return new __AccessControlList_initCall__Outputs(this);
  }
}

export class __AccessControlList_initCall__Inputs {
  _call: __AccessControlList_initCall;

  constructor(call: __AccessControlList_initCall) {
    this._call = call;
  }

  get _l0Admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _l1Admin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _l2Admin(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class __AccessControlList_initCall__Outputs {
  _call: __AccessControlList_initCall;

  constructor(call: __AccessControlList_initCall) {
    this._call = call;
  }
}

export class __AccessControlList_init_unchainedCall extends ethereum.Call {
  get inputs(): __AccessControlList_init_unchainedCall__Inputs {
    return new __AccessControlList_init_unchainedCall__Inputs(this);
  }

  get outputs(): __AccessControlList_init_unchainedCall__Outputs {
    return new __AccessControlList_init_unchainedCall__Outputs(this);
  }
}

export class __AccessControlList_init_unchainedCall__Inputs {
  _call: __AccessControlList_init_unchainedCall;

  constructor(call: __AccessControlList_init_unchainedCall) {
    this._call = call;
  }

  get _l0Admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _l1Admin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _l2Admin(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class __AccessControlList_init_unchainedCall__Outputs {
  _call: __AccessControlList_init_unchainedCall;

  constructor(call: __AccessControlList_init_unchainedCall) {
    this._call = call;
  }
}

export class ClaimRewardCall extends ethereum.Call {
  get inputs(): ClaimRewardCall__Inputs {
    return new ClaimRewardCall__Inputs(this);
  }

  get outputs(): ClaimRewardCall__Outputs {
    return new ClaimRewardCall__Outputs(this);
  }
}

export class ClaimRewardCall__Inputs {
  _call: ClaimRewardCall;

  constructor(call: ClaimRewardCall) {
    this._call = call;
  }

  get _rewardTokens(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get holder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _pools(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class ClaimRewardCall__Outputs {
  _call: ClaimRewardCall;

  constructor(call: ClaimRewardCall) {
    this._call = call;
  }
}

export class DistributeCall extends ethereum.Call {
  get inputs(): DistributeCall__Inputs {
    return new DistributeCall__Inputs(this);
  }

  get outputs(): DistributeCall__Outputs {
    return new DistributeCall__Outputs(this);
  }
}

export class DistributeCall__Inputs {
  _call: DistributeCall;

  constructor(call: DistributeCall) {
    this._call = call;
  }

  get _totalSupply(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DistributeCall__Outputs {
  _call: DistributeCall;

  constructor(call: DistributeCall) {
    this._call = call;
  }
}

export class Distribute1Call extends ethereum.Call {
  get inputs(): Distribute1Call__Inputs {
    return new Distribute1Call__Inputs(this);
  }

  get outputs(): Distribute1Call__Outputs {
    return new Distribute1Call__Outputs(this);
  }
}

export class Distribute1Call__Inputs {
  _call: Distribute1Call;

  constructor(call: Distribute1Call) {
    this._call = call;
  }

  get _account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _totalSupply(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _balance(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class Distribute1Call__Outputs {
  _call: Distribute1Call;

  constructor(call: Distribute1Call) {
    this._call = call;
  }
}

export class GetRewardsAccruedCall extends ethereum.Call {
  get inputs(): GetRewardsAccruedCall__Inputs {
    return new GetRewardsAccruedCall__Inputs(this);
  }

  get outputs(): GetRewardsAccruedCall__Outputs {
    return new GetRewardsAccruedCall__Outputs(this);
  }
}

export class GetRewardsAccruedCall__Inputs {
  _call: GetRewardsAccruedCall;

  constructor(call: GetRewardsAccruedCall) {
    this._call = call;
  }

  get _rewardTokens(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get holder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _pools(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }
}

export class GetRewardsAccruedCall__Outputs {
  _call: GetRewardsAccruedCall;

  constructor(call: GetRewardsAccruedCall) {
    this._call = call;
  }

  get value0(): Array<BigInt> {
    return this._call.outputValues[0].value.toBigIntArray();
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _l0Admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _l1Admin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _l2Admin(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SetAddressCall extends ethereum.Call {
  get inputs(): SetAddressCall__Inputs {
    return new SetAddressCall__Inputs(this);
  }

  get outputs(): SetAddressCall__Outputs {
    return new SetAddressCall__Outputs(this);
  }
}

export class SetAddressCall__Inputs {
  _call: SetAddressCall;

  constructor(call: SetAddressCall) {
    this._call = call;
  }

  get _key(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _value(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetAddressCall__Outputs {
  _call: SetAddressCall;

  constructor(call: SetAddressCall) {
    this._call = call;
  }
}

export class SetPoolSpeedsCall extends ethereum.Call {
  get inputs(): SetPoolSpeedsCall__Inputs {
    return new SetPoolSpeedsCall__Inputs(this);
  }

  get outputs(): SetPoolSpeedsCall__Outputs {
    return new SetPoolSpeedsCall__Outputs(this);
  }
}

export class SetPoolSpeedsCall__Inputs {
  _call: SetPoolSpeedsCall;

  constructor(call: SetPoolSpeedsCall) {
    this._call = call;
  }

  get _rewardToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _pool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _speed(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _addToList(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }
}

export class SetPoolSpeedsCall__Outputs {
  _call: SetPoolSpeedsCall;

  constructor(call: SetPoolSpeedsCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
