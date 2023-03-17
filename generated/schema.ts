// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Protocol extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromString(""));
    this.set("paused", Value.fromBoolean(false));
    this.set("l0Admin", Value.fromStringArray(new Array(0)));
    this.set("l1Admin", Value.fromStringArray(new Array(0)));
    this.set("l2Admin", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Protocol entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Protocol must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Protocol", id.toString(), this);
    }
  }

  static load(id: string): Protocol | null {
    return changetype<Protocol | null>(store.get("Protocol", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get paused(): boolean {
    let value = this.get("paused");
    return value!.toBoolean();
  }

  set paused(value: boolean) {
    this.set("paused", Value.fromBoolean(value));
  }

  get l0Admin(): Array<string> {
    let value = this.get("l0Admin");
    return value!.toStringArray();
  }

  set l0Admin(value: Array<string>) {
    this.set("l0Admin", Value.fromStringArray(value));
  }

  get l1Admin(): Array<string> {
    let value = this.get("l1Admin");
    return value!.toStringArray();
  }

  set l1Admin(value: Array<string>) {
    this.set("l1Admin", Value.fromStringArray(value));
  }

  get l2Admin(): Array<string> {
    let value = this.get("l2Admin");
    return value!.toStringArray();
  }

  set l2Admin(value: Array<string>) {
    this.set("l2Admin", Value.fromStringArray(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("protocol", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("rewardTokens", Value.fromStringArray(new Array(0)));
    this.set("rewardSpeeds", Value.fromBigIntArray(new Array(0)));
    this.set("feeToken", Value.fromString(""));
    this.set("issuerAlloc", Value.fromBigInt(BigInt.zero()));
    this.set("oracle", Value.fromString(""));
    this.set("paused", Value.fromBoolean(false));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("totalDebtUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalRevenueUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBurnUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("synthIds", Value.fromStringArray(new Array(0)));
    this.set("collateralIds", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get protocol(): string {
    let value = this.get("protocol");
    return value!.toString();
  }

  set protocol(value: string) {
    this.set("protocol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get rewardTokens(): Array<string> {
    let value = this.get("rewardTokens");
    return value!.toStringArray();
  }

  set rewardTokens(value: Array<string>) {
    this.set("rewardTokens", Value.fromStringArray(value));
  }

  get rewardSpeeds(): Array<BigInt> {
    let value = this.get("rewardSpeeds");
    return value!.toBigIntArray();
  }

  set rewardSpeeds(value: Array<BigInt>) {
    this.set("rewardSpeeds", Value.fromBigIntArray(value));
  }

  get feeToken(): string {
    let value = this.get("feeToken");
    return value!.toString();
  }

  set feeToken(value: string) {
    this.set("feeToken", Value.fromString(value));
  }

  get issuerAlloc(): BigInt {
    let value = this.get("issuerAlloc");
    return value!.toBigInt();
  }

  set issuerAlloc(value: BigInt) {
    this.set("issuerAlloc", Value.fromBigInt(value));
  }

  get oracle(): string {
    let value = this.get("oracle");
    return value!.toString();
  }

  set oracle(value: string) {
    this.set("oracle", Value.fromString(value));
  }

  get paused(): boolean {
    let value = this.get("paused");
    return value!.toBoolean();
  }

  set paused(value: boolean) {
    this.set("paused", Value.fromBoolean(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get totalDebtUSD(): BigDecimal {
    let value = this.get("totalDebtUSD");
    return value!.toBigDecimal();
  }

  set totalDebtUSD(value: BigDecimal) {
    this.set("totalDebtUSD", Value.fromBigDecimal(value));
  }

  get totalRevenueUSD(): BigDecimal {
    let value = this.get("totalRevenueUSD");
    return value!.toBigDecimal();
  }

  set totalRevenueUSD(value: BigDecimal) {
    this.set("totalRevenueUSD", Value.fromBigDecimal(value));
  }

  get totalBurnUSD(): BigDecimal {
    let value = this.get("totalBurnUSD");
    return value!.toBigDecimal();
  }

  set totalBurnUSD(value: BigDecimal) {
    this.set("totalBurnUSD", Value.fromBigDecimal(value));
  }

  get synthIds(): Array<string> {
    let value = this.get("synthIds");
    return value!.toStringArray();
  }

  set synthIds(value: Array<string>) {
    this.set("synthIds", Value.fromStringArray(value));
  }

  get collateralIds(): Array<string> {
    let value = this.get("collateralIds");
    return value!.toStringArray();
  }

  set collateralIds(value: Array<string>) {
    this.set("collateralIds", Value.fromStringArray(value));
  }

  get synths(): Array<string> {
    let value = this.get("synths");
    return value!.toStringArray();
  }

  set synths(value: Array<string>) {
    this.set("synths", Value.fromStringArray(value));
  }

  get collaterals(): Array<string> {
    let value = this.get("collaterals");
    return value!.toStringArray();
  }

  set collaterals(value: Array<string>) {
    this.set("collaterals", Value.fromStringArray(value));
  }

  get dayDatas(): Array<string> {
    let value = this.get("dayDatas");
    return value!.toStringArray();
  }

  set dayDatas(value: Array<string>) {
    this.set("dayDatas", Value.fromStringArray(value));
  }
}

export class PoolDayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dayId", Value.fromI32(0));
    this.set("pool", Value.fromString(""));
    this.set("dailyDebtIssuedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dailyDebtBurnedUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalDebtUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("dailyRevenueUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("dailyBurnUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalRevenueUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalBurnUSD", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolDayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolDayData must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolDayData", id.toString(), this);
    }
  }

  static load(id: string): PoolDayData | null {
    return changetype<PoolDayData | null>(store.get("PoolDayData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dayId(): i32 {
    let value = this.get("dayId");
    return value!.toI32();
  }

  set dayId(value: i32) {
    this.set("dayId", Value.fromI32(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get dailyDebtIssuedUSD(): BigDecimal {
    let value = this.get("dailyDebtIssuedUSD");
    return value!.toBigDecimal();
  }

  set dailyDebtIssuedUSD(value: BigDecimal) {
    this.set("dailyDebtIssuedUSD", Value.fromBigDecimal(value));
  }

  get dailyDebtBurnedUSD(): BigDecimal {
    let value = this.get("dailyDebtBurnedUSD");
    return value!.toBigDecimal();
  }

  set dailyDebtBurnedUSD(value: BigDecimal) {
    this.set("dailyDebtBurnedUSD", Value.fromBigDecimal(value));
  }

  get totalDebtUSD(): BigDecimal {
    let value = this.get("totalDebtUSD");
    return value!.toBigDecimal();
  }

  set totalDebtUSD(value: BigDecimal) {
    this.set("totalDebtUSD", Value.fromBigDecimal(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get dailyRevenueUSD(): BigDecimal {
    let value = this.get("dailyRevenueUSD");
    return value!.toBigDecimal();
  }

  set dailyRevenueUSD(value: BigDecimal) {
    this.set("dailyRevenueUSD", Value.fromBigDecimal(value));
  }

  get dailyBurnUSD(): BigDecimal {
    let value = this.get("dailyBurnUSD");
    return value!.toBigDecimal();
  }

  set dailyBurnUSD(value: BigDecimal) {
    this.set("dailyBurnUSD", Value.fromBigDecimal(value));
  }

  get totalRevenueUSD(): BigDecimal {
    let value = this.get("totalRevenueUSD");
    return value!.toBigDecimal();
  }

  set totalRevenueUSD(value: BigDecimal) {
    this.set("totalRevenueUSD", Value.fromBigDecimal(value));
  }

  get totalBurnUSD(): BigDecimal {
    let value = this.get("totalBurnUSD");
    return value!.toBigDecimal();
  }

  set totalBurnUSD(value: BigDecimal) {
    this.set("totalBurnUSD", Value.fromBigDecimal(value));
  }
}

export class CollateralDayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dayId", Value.fromI32(0));
    this.set("collateral", Value.fromString(""));
    this.set("dailyDeposits", Value.fromBigInt(BigInt.zero()));
    this.set("dailyWithdrawals", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeDeposits", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeWithdrawals", Value.fromBigInt(BigInt.zero()));
    this.set("totalDeposits", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CollateralDayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CollateralDayData must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CollateralDayData", id.toString(), this);
    }
  }

  static load(id: string): CollateralDayData | null {
    return changetype<CollateralDayData | null>(
      store.get("CollateralDayData", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dayId(): i32 {
    let value = this.get("dayId");
    return value!.toI32();
  }

  set dayId(value: i32) {
    this.set("dayId", Value.fromI32(value));
  }

  get collateral(): string {
    let value = this.get("collateral");
    return value!.toString();
  }

  set collateral(value: string) {
    this.set("collateral", Value.fromString(value));
  }

  get dailyDeposits(): BigInt {
    let value = this.get("dailyDeposits");
    return value!.toBigInt();
  }

  set dailyDeposits(value: BigInt) {
    this.set("dailyDeposits", Value.fromBigInt(value));
  }

  get dailyWithdrawals(): BigInt {
    let value = this.get("dailyWithdrawals");
    return value!.toBigInt();
  }

  set dailyWithdrawals(value: BigInt) {
    this.set("dailyWithdrawals", Value.fromBigInt(value));
  }

  get cumulativeDeposits(): BigInt {
    let value = this.get("cumulativeDeposits");
    return value!.toBigInt();
  }

  set cumulativeDeposits(value: BigInt) {
    this.set("cumulativeDeposits", Value.fromBigInt(value));
  }

  get cumulativeWithdrawals(): BigInt {
    let value = this.get("cumulativeWithdrawals");
    return value!.toBigInt();
  }

  set cumulativeWithdrawals(value: BigInt) {
    this.set("cumulativeWithdrawals", Value.fromBigInt(value));
  }

  get totalDeposits(): BigInt {
    let value = this.get("totalDeposits");
    return value!.toBigInt();
  }

  set totalDeposits(value: BigInt) {
    this.set("totalDeposits", Value.fromBigInt(value));
  }
}

export class SynthDayData extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dayId", Value.fromI32(0));
    this.set("synth", Value.fromString(""));
    this.set("dailyMinted", Value.fromBigInt(BigInt.zero()));
    this.set("dailyBurned", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeMinted", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeBurned", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SynthDayData entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SynthDayData must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SynthDayData", id.toString(), this);
    }
  }

  static load(id: string): SynthDayData | null {
    return changetype<SynthDayData | null>(store.get("SynthDayData", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dayId(): i32 {
    let value = this.get("dayId");
    return value!.toI32();
  }

  set dayId(value: i32) {
    this.set("dayId", Value.fromI32(value));
  }

  get synth(): string {
    let value = this.get("synth");
    return value!.toString();
  }

  set synth(value: string) {
    this.set("synth", Value.fromString(value));
  }

  get dailyMinted(): BigInt {
    let value = this.get("dailyMinted");
    return value!.toBigInt();
  }

  set dailyMinted(value: BigInt) {
    this.set("dailyMinted", Value.fromBigInt(value));
  }

  get dailyBurned(): BigInt {
    let value = this.get("dailyBurned");
    return value!.toBigInt();
  }

  set dailyBurned(value: BigInt) {
    this.set("dailyBurned", Value.fromBigInt(value));
  }

  get cumulativeMinted(): BigInt {
    let value = this.get("cumulativeMinted");
    return value!.toBigInt();
  }

  set cumulativeMinted(value: BigInt) {
    this.set("cumulativeMinted", Value.fromBigInt(value));
  }

  get cumulativeBurned(): BigInt {
    let value = this.get("cumulativeBurned");
    return value!.toBigInt();
  }

  set cumulativeBurned(value: BigInt) {
    this.set("cumulativeBurned", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }
}

export class Synth extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("isEnabled", Value.fromBoolean(false));
    this.set("mintFee", Value.fromBigInt(BigInt.zero()));
    this.set("burnFee", Value.fromBigInt(BigInt.zero()));
    this.set("token", Value.fromString(""));
    this.set("cumulativeMinted", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeBurned", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("priceUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("lastPriceUpdate", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Synth entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Synth must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Synth", id.toString(), this);
    }
  }

  static load(id: string): Synth | null {
    return changetype<Synth | null>(store.get("Synth", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get isEnabled(): boolean {
    let value = this.get("isEnabled");
    return value!.toBoolean();
  }

  set isEnabled(value: boolean) {
    this.set("isEnabled", Value.fromBoolean(value));
  }

  get mintFee(): BigInt {
    let value = this.get("mintFee");
    return value!.toBigInt();
  }

  set mintFee(value: BigInt) {
    this.set("mintFee", Value.fromBigInt(value));
  }

  get burnFee(): BigInt {
    let value = this.get("burnFee");
    return value!.toBigInt();
  }

  set burnFee(value: BigInt) {
    this.set("burnFee", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get cumulativeMinted(): BigInt {
    let value = this.get("cumulativeMinted");
    return value!.toBigInt();
  }

  set cumulativeMinted(value: BigInt) {
    this.set("cumulativeMinted", Value.fromBigInt(value));
  }

  get cumulativeBurned(): BigInt {
    let value = this.get("cumulativeBurned");
    return value!.toBigInt();
  }

  set cumulativeBurned(value: BigInt) {
    this.set("cumulativeBurned", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get priceUSD(): BigDecimal {
    let value = this.get("priceUSD");
    return value!.toBigDecimal();
  }

  set priceUSD(value: BigDecimal) {
    this.set("priceUSD", Value.fromBigDecimal(value));
  }

  get lastPriceUpdate(): i32 {
    let value = this.get("lastPriceUpdate");
    return value!.toI32();
  }

  set lastPriceUpdate(value: i32) {
    this.set("lastPriceUpdate", Value.fromI32(value));
  }

  get dayDatas(): Array<string> {
    let value = this.get("dayDatas");
    return value!.toStringArray();
  }

  set dayDatas(value: Array<string>) {
    this.set("dayDatas", Value.fromStringArray(value));
  }
}

export class Collateral extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("pool", Value.fromString(""));
    this.set("token", Value.fromString(""));
    this.set("isEnabled", Value.fromBoolean(false));
    this.set("cap", Value.fromBigInt(BigInt.zero()));
    this.set("baseLTV", Value.fromI32(0));
    this.set("liqThreshold", Value.fromI32(0));
    this.set("liqBonus", Value.fromI32(0));
    this.set("totalDeposits", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeDeposits", Value.fromBigInt(BigInt.zero()));
    this.set("cumulativeWithdrawals", Value.fromBigInt(BigInt.zero()));
    this.set("totalPositions", Value.fromI32(0));
    this.set("cumulativeEnteredPositions", Value.fromI32(0));
    this.set("cumulativeExitedPositions", Value.fromI32(0));
    this.set("priceUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("lastPriceUpdate", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Collateral entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Collateral must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Collateral", id.toString(), this);
    }
  }

  static load(id: string): Collateral | null {
    return changetype<Collateral | null>(store.get("Collateral", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get isEnabled(): boolean {
    let value = this.get("isEnabled");
    return value!.toBoolean();
  }

  set isEnabled(value: boolean) {
    this.set("isEnabled", Value.fromBoolean(value));
  }

  get cap(): BigInt {
    let value = this.get("cap");
    return value!.toBigInt();
  }

  set cap(value: BigInt) {
    this.set("cap", Value.fromBigInt(value));
  }

  get baseLTV(): i32 {
    let value = this.get("baseLTV");
    return value!.toI32();
  }

  set baseLTV(value: i32) {
    this.set("baseLTV", Value.fromI32(value));
  }

  get liqThreshold(): i32 {
    let value = this.get("liqThreshold");
    return value!.toI32();
  }

  set liqThreshold(value: i32) {
    this.set("liqThreshold", Value.fromI32(value));
  }

  get liqBonus(): i32 {
    let value = this.get("liqBonus");
    return value!.toI32();
  }

  set liqBonus(value: i32) {
    this.set("liqBonus", Value.fromI32(value));
  }

  get totalDeposits(): BigInt {
    let value = this.get("totalDeposits");
    return value!.toBigInt();
  }

  set totalDeposits(value: BigInt) {
    this.set("totalDeposits", Value.fromBigInt(value));
  }

  get cumulativeDeposits(): BigInt {
    let value = this.get("cumulativeDeposits");
    return value!.toBigInt();
  }

  set cumulativeDeposits(value: BigInt) {
    this.set("cumulativeDeposits", Value.fromBigInt(value));
  }

  get cumulativeWithdrawals(): BigInt {
    let value = this.get("cumulativeWithdrawals");
    return value!.toBigInt();
  }

  set cumulativeWithdrawals(value: BigInt) {
    this.set("cumulativeWithdrawals", Value.fromBigInt(value));
  }

  get totalPositions(): i32 {
    let value = this.get("totalPositions");
    return value!.toI32();
  }

  set totalPositions(value: i32) {
    this.set("totalPositions", Value.fromI32(value));
  }

  get cumulativeEnteredPositions(): i32 {
    let value = this.get("cumulativeEnteredPositions");
    return value!.toI32();
  }

  set cumulativeEnteredPositions(value: i32) {
    this.set("cumulativeEnteredPositions", Value.fromI32(value));
  }

  get cumulativeExitedPositions(): i32 {
    let value = this.get("cumulativeExitedPositions");
    return value!.toI32();
  }

  set cumulativeExitedPositions(value: i32) {
    this.set("cumulativeExitedPositions", Value.fromI32(value));
  }

  get priceUSD(): BigDecimal {
    let value = this.get("priceUSD");
    return value!.toBigDecimal();
  }

  set priceUSD(value: BigDecimal) {
    this.set("priceUSD", Value.fromBigDecimal(value));
  }

  get lastPriceUpdate(): i32 {
    let value = this.get("lastPriceUpdate");
    return value!.toI32();
  }

  set lastPriceUpdate(value: i32) {
    this.set("lastPriceUpdate", Value.fromI32(value));
  }

  get dayDatas(): Array<string> {
    let value = this.get("dayDatas");
    return value!.toStringArray();
  }

  set dayDatas(value: Array<string>) {
    this.set("dayDatas", Value.fromStringArray(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get positions(): Array<string> {
    let value = this.get("positions");
    return value!.toStringArray();
  }

  set positions(value: Array<string>) {
    this.set("positions", Value.fromStringArray(value));
  }
}

export class AccountPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("account", Value.fromString(""));
    this.set("pool", Value.fromString(""));
    this.set("balance", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AccountPosition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AccountPosition must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AccountPosition", id.toString(), this);
    }
  }

  static load(id: string): AccountPosition | null {
    return changetype<AccountPosition | null>(store.get("AccountPosition", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get collateralBalances(): Array<string> {
    let value = this.get("collateralBalances");
    return value!.toStringArray();
  }

  set collateralBalances(value: Array<string>) {
    this.set("collateralBalances", Value.fromStringArray(value));
  }
}

export class AccountBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("accountPosition", Value.fromString(""));
    this.set("collateral", Value.fromString(""));
    this.set("hasEntered", Value.fromBoolean(false));
    this.set("balance", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AccountBalance entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AccountBalance must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AccountBalance", id.toString(), this);
    }
  }

  static load(id: string): AccountBalance | null {
    return changetype<AccountBalance | null>(store.get("AccountBalance", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get accountPosition(): string {
    let value = this.get("accountPosition");
    return value!.toString();
  }

  set accountPosition(value: string) {
    this.set("accountPosition", Value.fromString(value));
  }

  get collateral(): string {
    let value = this.get("collateral");
    return value!.toString();
  }

  set collateral(value: string) {
    this.set("collateral", Value.fromString(value));
  }

  get hasEntered(): boolean {
    let value = this.get("hasEntered");
    return value!.toBoolean();
  }

  set hasEntered(value: boolean) {
    this.set("hasEntered", Value.fromBoolean(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("symbol", Value.fromString(""));
    this.set("decimals", Value.fromI32(0));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Token must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value!.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }
}
