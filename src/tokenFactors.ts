export interface TokenFactors {
  borrowFactor: number;
  collateralFactor: number;
  liqIncentive: number;
}

export interface TokenFactorMap {
  [tokenAddress: string]: TokenFactors;
}
