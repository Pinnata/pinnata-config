import { ChainId } from "@dahlia-labs/celo-contrib";
import { CELO, CEUR, CUSD, MOBI, SUSHI, UBE } from "@dahlia-labs/celo-tokens";
import type { Token } from "@dahlia-labs/token-utils";
import { getAddress } from "@ethersproject/address";

export enum Protocol {
  SushiSwap,
  Ubeswap,
}

export interface DisplayProtocol {
  protocol: Protocol;
  name: string;
  color: string;
  logo: string;
  url: string;
}

export const Ubeswap: DisplayProtocol = {
  protocol: Protocol.Ubeswap,
  name: "Ubeswap",
  color: "#8878c3",
  logo: "UbeswapLogo",
  url: "https://ubeswap.org",
};

const sushiProtocolInfo = {
  protocol: Protocol.SushiSwap,
  color: "#0993ec",
  logo: "SushiLogo",
  url: "https://sushi.com",
};

export const SushiV1: DisplayProtocol = {
  ...sushiProtocolInfo,
  name: "Sushiswap v1",
};

export const SushiV2: DisplayProtocol = {
  ...sushiProtocolInfo,
  name: "Sushiswap v2",
};

export type IFarm = {
  wrapper: string;
  spell: string;
  id?: string;
  rewarder: string;
  externalRewarder?: string;
  lp: string;
  underlying: readonly [Token, Token];
  rewards: readonly Token[];
  protocol: DisplayProtocol;
};

export const Farms: { [chainId in ChainId]: readonly IFarm[] } = {
  [ChainId.Mainnet]: [
    {
      wrapper: getAddress("0xE583FeC0B218bB89CbB24d76D2A6D901E082DAAA"),
      spell: getAddress("0x4163A7dB783D3d6d761Bd9060EcDe42D1C2D8c74"),
      lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
      rewarder: getAddress("0xE583FeC0B218bB89CbB24d76D2A6D901E082DAAA"),
      externalRewarder: getAddress(
        "0x1be211d8da40bc0ae8719c6663307bfc987b1d6c"
      ),
      id: "3",
      protocol: SushiV1,
      underlying: [CEUR[ChainId.Mainnet], CUSD[ChainId.Mainnet]],
      rewards: [SUSHI[ChainId.Mainnet], CELO[ChainId.Mainnet]],
    },
    {
      wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
      spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
      lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
      rewarder: getAddress("0x8084936982D089130e001b470eDf58faCA445008"),
      id: "3",
      externalRewarder: getAddress(
        "0xfa3de59edd2500ba725dad355b98e6a4346ada7d"
      ),
      protocol: SushiV2,
      underlying: [CUSD[ChainId.Mainnet], CEUR[ChainId.Mainnet]],
      rewards: [SUSHI[ChainId.Mainnet], CELO[ChainId.Mainnet]],
    },
    {
      wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
      spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
      lp: getAddress("0x8ecded81a2abf3b7e724978060739edbeb01b24f"),
      rewarder: getAddress("0x8084936982D089130e001b470eDf58faCA445008"),
      id: "8",
      externalRewarder: getAddress(
        "0xfa3de59edd2500ba725dad355b98e6a4346ada7d"
      ),
      protocol: SushiV2,
      underlying: [CELO[ChainId.Mainnet], MOBI[ChainId.Mainnet]],
      rewards: [SUSHI[ChainId.Mainnet], CELO[ChainId.Mainnet]],
    },
    {
      wrapper: getAddress("0xFab4224Ce8E71e2f8F95f63a088d828d5B570e12"),
      spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
      lp: getAddress("0x0b81cf47c8f97275d14c006e537d5101b6c87300"),
      rewarder: getAddress("0xb450940c5297e9b5e7167FAC5903fD1e90b439b8"),
      protocol: Ubeswap,
      underlying: [CELO[ChainId.Mainnet], MOBI[ChainId.Mainnet]],
      rewards: [
        UBE[ChainId.Mainnet],
        CELO[ChainId.Mainnet],
        MOBI[ChainId.Mainnet],
      ],
    },
    {
      wrapper: getAddress("0x1B9dF6fd569778f48E7db3eB000C93a80920EA23"),
      spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
      lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
      rewarder: getAddress("0x9D87c01672A7D02b2Dc0D0eB7A145C7e13793c3B"),
      protocol: Ubeswap,
      underlying: [CELO[ChainId.Mainnet], UBE[ChainId.Mainnet]],
      rewards: [UBE[ChainId.Mainnet], CELO[ChainId.Mainnet]],
    },
  ],
  [ChainId.Alfajores]: [],
  [ChainId.Baklava]: [],
} as const;
