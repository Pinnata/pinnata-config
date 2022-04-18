import { ChainId } from "@dahlia-labs/celo-contrib";
import type { JsonRpcProvider } from "@ethersproject/providers";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import * as fs from "fs/promises";
import invariant from "tiny-invariant";

import PROXY_ORACLE_ABI from "../abis/ProxyOracle.json";
import { Farms } from "../farms";
import type { ProxyOracle } from "../generated";
import { Safeboxes } from "../safeboxes";
import type { TokenFactorMap, TokenFactors } from "../tokenFactors";
import { useBankContract, useContract } from "./fetchSafeboxes";

function useProxyOracleContract(
  provider: JsonRpcProvider,
  oracle: string
): ProxyOracle | null {
  return useContract(
    oracle,
    PROXY_ORACLE_ABI.abi,
    provider
  ) as ProxyOracle | null;
}

export const fetchTokenFactors = async (): Promise<void> => {
  const provider = new StaticJsonRpcProvider("https://forno.celo.org");

  const bankContract = useBankContract(provider);
  invariant(bankContract);

  const oracle = await bankContract.oracle();
  const oracleContract = useProxyOracleContract(provider, oracle);
  invariant(oracleContract);

  const getTokenFactors = async (
    tokenAddress: string
  ): Promise<TokenFactors> => {
    const factors = await oracleContract.tokenFactors(tokenAddress);
    return {
      borrowFactor: factors.borrowFactor,
      collateralFactor: factors.collateralFactor,
      liqIncentive: factors.liqIncentive,
    };
  };

  const tokenFactorMap: TokenFactorMap = (
    await Promise.all(
      Safeboxes[ChainId.Mainnet].map(async (s) => ({
        [s.underlying.address]: await getTokenFactors(s.underlying.address),
      }))
    )
  )
    .concat(
      await Promise.all(
        Farms[ChainId.Mainnet].map(async (f) => ({
          [f.lp]: await getTokenFactors(f.lp),
        }))
      )
    )
    .reduce(
      (acc: TokenFactorMap, cur: TokenFactorMap) => ({
        ...acc,
        ...cur,
      }),
      {}
    );

  await fs.writeFile(
    "src/data/tokenFactors.json",
    JSON.stringify(tokenFactorMap, null, 2)
  );

  console.log(
    `Discovered and wrote ${
      Safeboxes[ChainId.Mainnet].length + Farms[ChainId.Mainnet].length
    } token factors`
  );
};
