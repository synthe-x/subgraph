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

export class AssetSourceUpdated extends ethereum.Event {
  get params(): AssetSourceUpdated__Params {
    return new AssetSourceUpdated__Params(this);
  }
}

export class AssetSourceUpdated__Params {
  _event: AssetSourceUpdated;

  constructor(event: AssetSourceUpdated) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get source(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BaseCurrencySet extends ethereum.Event {
  get params(): BaseCurrencySet__Params {
    return new BaseCurrencySet__Params(this);
  }
}

export class BaseCurrencySet__Params {
  _event: BaseCurrencySet;

  constructor(event: BaseCurrencySet) {
    this._event = event;
  }

  get baseCurrency(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get baseCurrencyUnit(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class FallbackOracleUpdated extends ethereum.Event {
  get params(): FallbackOracleUpdated__Params {
    return new FallbackOracleUpdated__Params(this);
  }
}

export class FallbackOracleUpdated__Params {
  _event: FallbackOracleUpdated;

  constructor(event: FallbackOracleUpdated) {
    this._event = event;
  }

  get fallbackOracle(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class PriceOracle extends ethereum.SmartContract {
  static bind(address: Address): PriceOracle {
    return new PriceOracle("PriceOracle", address);
  }

  BASE_CURRENCY(): Address {
    let result = super.call("BASE_CURRENCY", "BASE_CURRENCY():(address)", []);

    return result[0].toAddress();
  }

  try_BASE_CURRENCY(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "BASE_CURRENCY",
      "BASE_CURRENCY():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  BASE_CURRENCY_UNIT(): BigInt {
    let result = super.call(
      "BASE_CURRENCY_UNIT",
      "BASE_CURRENCY_UNIT():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_BASE_CURRENCY_UNIT(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "BASE_CURRENCY_UNIT",
      "BASE_CURRENCY_UNIT():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAssetPrice(asset: Address): BigInt {
    let result = super.call(
      "getAssetPrice",
      "getAssetPrice(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getAssetPrice(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getAssetPrice",
      "getAssetPrice(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAssetsPrices(assets: Array<Address>): Array<BigInt> {
    let result = super.call(
      "getAssetsPrices",
      "getAssetsPrices(address[]):(uint256[])",
      [ethereum.Value.fromAddressArray(assets)]
    );

    return result[0].toBigIntArray();
  }

  try_getAssetsPrices(
    assets: Array<Address>
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getAssetsPrices",
      "getAssetsPrices(address[]):(uint256[])",
      [ethereum.Value.fromAddressArray(assets)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getFallbackOracle(): Address {
    let result = super.call(
      "getFallbackOracle",
      "getFallbackOracle():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getFallbackOracle(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getFallbackOracle",
      "getFallbackOracle():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getSourceOfAsset(asset: Address): Address {
    let result = super.call(
      "getSourceOfAsset",
      "getSourceOfAsset(address):(address)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toAddress();
  }

  try_getSourceOfAsset(asset: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getSourceOfAsset",
      "getSourceOfAsset(address):(address)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  synthex(): Address {
    let result = super.call("synthex", "synthex():(address)", []);

    return result[0].toAddress();
  }

  try_synthex(): ethereum.CallResult<Address> {
    let result = super.tryCall("synthex", "synthex():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _synthex(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get assets(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }

  get sources(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get fallbackOracle(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get baseCurrency(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get baseCurrencyUnit(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class SetAssetSourcesCall extends ethereum.Call {
  get inputs(): SetAssetSourcesCall__Inputs {
    return new SetAssetSourcesCall__Inputs(this);
  }

  get outputs(): SetAssetSourcesCall__Outputs {
    return new SetAssetSourcesCall__Outputs(this);
  }
}

export class SetAssetSourcesCall__Inputs {
  _call: SetAssetSourcesCall;

  constructor(call: SetAssetSourcesCall) {
    this._call = call;
  }

  get assets(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get sources(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class SetAssetSourcesCall__Outputs {
  _call: SetAssetSourcesCall;

  constructor(call: SetAssetSourcesCall) {
    this._call = call;
  }
}

export class SetFallbackOracleCall extends ethereum.Call {
  get inputs(): SetFallbackOracleCall__Inputs {
    return new SetFallbackOracleCall__Inputs(this);
  }

  get outputs(): SetFallbackOracleCall__Outputs {
    return new SetFallbackOracleCall__Outputs(this);
  }
}

export class SetFallbackOracleCall__Inputs {
  _call: SetFallbackOracleCall;

  constructor(call: SetFallbackOracleCall) {
    this._call = call;
  }

  get fallbackOracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetFallbackOracleCall__Outputs {
  _call: SetFallbackOracleCall;

  constructor(call: SetFallbackOracleCall) {
    this._call = call;
  }
}
