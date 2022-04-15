import { ChainId } from "@dahlia-labs/celo-contrib";
import type { TokenInfo } from "@dahlia-labs/token-utils";
import { Token } from "@dahlia-labs/token-utils";

import SafeboxData from "../data/safeboxes.json";

export type ISafebox = {
  underlying: Token;
  pAsset: Token;
  cToken: string;
};

export const Safeboxes: { [chainId in ChainId]: ISafebox[] } = {
  [ChainId.Mainnet]: SafeboxData.map(
    (s: { underlying: TokenInfo; pAsset: TokenInfo; cToken: string }) => ({
      underlying: new Token({ ...s.underlying }),
      pAsset: new Token({ ...s.pAsset }),
      cToken: s.cToken,
    })
  ),
  [ChainId.Alfajores]: [],
  [ChainId.Baklava]: [],
};
