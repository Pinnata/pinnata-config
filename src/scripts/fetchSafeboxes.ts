import { ChainId } from "@dahlia-labs/celo-contrib";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import type { ContractInterface } from "@ethersproject/contracts";
import { Contract } from "@ethersproject/contracts";
import type { JsonRpcProvider } from "@ethersproject/providers";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import * as fs from "fs/promises";
import invariant from "tiny-invariant";

import HOMORA_BANK_ABI from "../abis/HomoraBank.json";
import { BankAddress, collaterals } from "../constants";
import type { HomoraBank } from "../generated";
import type { ISafebox } from "../safeboxes";

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is optional
export function getContract(
  address: string,
  ABI: ContractInterface,
  provider: JsonRpcProvider
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, provider);
}

export function useContract(
  address: string | undefined,
  ABI: ContractInterface,
  provider: JsonRpcProvider
): Contract | null {
  if (!address || !ABI) return null;
  try {
    return getContract(address, ABI, provider);
  } catch (error) {
    console.error("Failed to get contract", error);
    return null;
  }
}

export function useBankContract(provider: JsonRpcProvider): HomoraBank | null {
  return useContract(
    BankAddress[ChainId.Mainnet],
    HOMORA_BANK_ABI.abi,
    provider
  ) as HomoraBank | null;
}

export const fetchSafeboxes = async (): Promise<void> => {
  const provider = new StaticJsonRpcProvider("https://forno.celo.org");

  const bankContract = useBankContract(provider);

  invariant(bankContract);

  const safeboxes: ISafebox[] = await Promise.all(
    collaterals.map(async (c) => {
      const cToken = (await bankContract.getBankInfo(c.underlying.address))
        .cToken;
      return {
        ...c,
        cToken: getAddress(cToken),
      };
    })
  );

  await fs.writeFile(
    "src/data/safeboxes.json",
    JSON.stringify(safeboxes, null, 2)
  );

  console.log(`Discovered and wrote ${safeboxes.length} safeboxes`);
};
