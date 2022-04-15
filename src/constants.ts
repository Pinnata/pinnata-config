import { ChainId } from "@dahlia-labs/celo-contrib";
import {
  CELO,
  CEUR,
  CUSD,
  dCELO,
  dcEUR,
  dcUSD,
  dMOBI,
  dUBE,
  MOBI,
  UBE,
} from "@dahlia-labs/celo-tokens";

export const collaterals = [
  {
    underlying: CELO[ChainId.Mainnet],
    pAsset: dCELO[ChainId.Mainnet],
  },
  {
    underlying: CUSD[ChainId.Mainnet],
    pAsset: dcUSD[ChainId.Mainnet],
  },
  {
    underlying: CEUR[ChainId.Mainnet],
    pAsset: dcEUR[ChainId.Mainnet],
  },
  {
    underlying: MOBI[ChainId.Mainnet],
    pAsset: dMOBI[ChainId.Mainnet],
  },
  {
    underlying: UBE[ChainId.Mainnet],
    pAsset: dUBE[ChainId.Mainnet],
  },
];

export const BankAddress: { [chainId in ChainId]: string } = {
  [ChainId.Mainnet]: "0x827cCeA3D460D458393EEAfE831698d83FE47BA7",
  [ChainId.Alfajores]: "0x827cCeA3D460D458393EEAfE831698d83FE47BA7",
  [ChainId.Baklava]: "0x827cCeA3D460D458393EEAfE831698d83FE47BA7",
};
