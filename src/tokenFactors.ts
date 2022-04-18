import { ChainId } from "@dahlia-labs/celo-contrib";

import TokenFactorData from "./data/tokenFactors.json";

export interface TokenFactor {
  borrowFactor: number;
  collateralFactor: number;
  liqIncentive: number;
}

export interface TokenFactorMap {
  [tokenAddress: string]: TokenFactor;
}

export const TokenFactors: { [chainId in ChainId]: TokenFactorMap } = {
  [ChainId.Mainnet]: TokenFactorData,
  [ChainId.Alfajores]: {},
  [ChainId.Baklava]: {},
};
