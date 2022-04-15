import { ChainId } from "@dahlia-labs/token-utils";
import type { JsonRpcProvider } from "@ethersproject/providers";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import * as fs from "fs/promises";
import invariant from "tiny-invariant";

import PROXY_ORACLE_ABI from "./abis/ProxyOracle.json";
import { Farms } from "./farms";
import { useBankContract, useContract } from "./fetchSafeboxes";
import type { ProxyOracle } from "./generated";
import { Safeboxes } from "./safeboxes";
import type { TokenFactorMap, TokenFactors } from "./tokenFactors";

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

  const getTokenFactors = async (tokenAddress: string) =>
    await oracleContract.tokenFactors(tokenAddress);

  const tokenFactorMap: TokenFactorMap = (
    await Promise.all(
      Safeboxes[ChainId.Mainnet].map(async (s) => ({
        [s.underlying.address]: (await getTokenFactors(
          s.underlying.address
        )) as TokenFactors,
      }))
    )
  )
    .concat(
      await Promise.all(
        Farms[ChainId.Mainnet].map(async (f) => ({
          [f.lp]: (await getTokenFactors(f.lp)) as TokenFactors,
        }))
      )
    )
    .reduce(
      (acc, cur) => ({
        ...acc,
        ...cur,
      }),
      {}
    );

  await fs.writeFile(
    "data/tokenFactors.json",
    JSON.stringify(tokenFactorMap, null, 2)
  );

  console.log(
    `Discovered and wrote ${
      Safeboxes[ChainId.Mainnet].length + Farms[ChainId.Mainnet].length
    } token factors`
  );
};