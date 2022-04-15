import { ChainId } from "@dahlia-labs/token-utils";

import TokenFactorData from "../data/tokenFactors.json";

export interface TokenFactors {
  borrowFactor: number;
  collateralFactor: number;
  liqIncentive: number;
}

export interface TokenFactorMap {
  [tokenAddress: string]: TokenFactors;
}

export const Safeboxes: { [chainId in ChainId]: TokenFactorMap } = {
  [ChainId.Mainnet]: TokenFactorData,
  [ChainId.Alfajores]: {},
  [ChainId.Baklava]: {},
};
