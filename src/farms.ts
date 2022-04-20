import { ChainId } from "@dahlia-labs/celo-contrib";
import { CELO, CEUR, CUSD, MOBI, SUSHI, UBE } from "@dahlia-labs/celo-tokens";
import type { Token } from "@dahlia-labs/token-utils";
import { getAddress } from "@ethersproject/address";

export enum Protocol {
  SushiSwap,
  Ubeswap,
}

export interface DisplayProtocol {
  name: string;
  color: string;
  logo: string;
  url: string;
}

const Ubeswap: DisplayProtocol = {
  name: "Ubeswap",
  color: "#8878c3",
  logo: "UbeswapLogo",
  url: "https://ubeswap.org",
};

const sushiProtocolInfo = {
  color: "#0993ec",
  logo: "SushiLogo",
  url: "https://sushi.com",
};

const SushiV1: DisplayProtocol = {
  ...sushiProtocolInfo,
  name: "Sushiswap v1",
};

const SushiV2: DisplayProtocol = {
  ...sushiProtocolInfo,
  name: "Sushiswap v2",
};

export type IFarm = {
  protocol: Protocol;
  display: DisplayProtocol;
  underlying: readonly [Token, Token];
  lp: string;
  wrapper: string;
  spell: string;

  externalRewards: SushiExternalRewards | UbeExternalRewards;
};

export type UbeExternalRewards = {
  multistaking: IMSR;
};

export type IMSR = {
  address: string;
  rewardsToken: Token;
  externalRewarder: IMSR | null;
};

const MobiMSR: IMSR = {
  address: getAddress("0xb450940c5297e9b5e7167FAC5903fD1e90b439b8"),
  rewardsToken: CELO[ChainId.Mainnet],
  externalRewarder: {
    address: getAddress("0xd930501A0848DC0AA3E301c7B9b8AFE8134D7f5F"),
    rewardsToken: MOBI[ChainId.Mainnet],
    externalRewarder: {
      address: getAddress("0x19F1A692C77B481C23e9916E3E83Af919eD49765"),
      rewardsToken: UBE[ChainId.Mainnet],
      externalRewarder: null,
    },
  },
};

const UbeMSR: IMSR = {
  address: getAddress("0x9D87c01672A7D02b2Dc0D0eB7A145C7e13793c3B"),
  rewardsToken: CELO[ChainId.Mainnet],
  externalRewarder: {
    address: getAddress("0x295D6f96081fEB1569d9Ce005F7f2710042ec6a1"),
    rewardsToken: UBE[ChainId.Mainnet],
    externalRewarder: null,
  },
};

export type SushiChef = {
  address: string;
  rewardsToken: Token;
  externalRewarder: string;
  externalRewardsToken: Token;
};

const sushiChefV1: SushiChef = {
  address: getAddress("0xE583FeC0B218bB89CbB24d76D2A6D901E082DAAA"),
  rewardsToken: SUSHI[ChainId.Mainnet],
  externalRewarder: getAddress("0x1be211d8da40bc0ae8719c6663307bfc987b1d6c"),
  externalRewardsToken: CELO[ChainId.Mainnet],
};

const sushiChefV2: SushiChef = {
  address: getAddress("0x8084936982D089130e001b470eDf58faCA445008"),
  rewardsToken: SUSHI[ChainId.Mainnet],
  externalRewarder: getAddress("0xfa3de59edd2500ba725dad355b98e6a4346ada7d"),
  externalRewardsToken: CELO[ChainId.Mainnet],
};

export type SushiExternalRewards = {
  id: string;
  sushiChef: SushiChef;
};

export const Farms: { [chainId in ChainId]: readonly IFarm[] } = {
  [ChainId.Mainnet]: [
    {
      protocol: Protocol.SushiSwap,
      display: SushiV1,
      wrapper: getAddress("0xE583FeC0B218bB89CbB24d76D2A6D901E082DAAA"),
      spell: getAddress("0x4163A7dB783D3d6d761Bd9060EcDe42D1C2D8c74"),
      lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
      underlying: [CEUR[ChainId.Mainnet], CUSD[ChainId.Mainnet]],

      externalRewards: {
        id: "3",
        sushiChef: sushiChefV1,
      },
    },
    {
      protocol: Protocol.SushiSwap,
      display: SushiV2,
      wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
      spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
      lp: getAddress("0x0b655E7D966CB27998af94AA5719ab7BFe07D3b3"),
      underlying: [CUSD[ChainId.Mainnet], CEUR[ChainId.Mainnet]],

      externalRewards: {
        id: "3",
        sushiChef: sushiChefV2,
      },
    },
    {
      protocol: Protocol.SushiSwap,
      display: SushiV2,
      wrapper: getAddress("0x1C4da0695aE25847260628d7eA92c5d336Fe1998"),
      spell: getAddress("0x70CFe574715213782B3BcCfFcbb8d4a298388de7"),
      lp: getAddress("0x8ecded81a2abf3b7e724978060739edbeb01b24f"),
      underlying: [CELO[ChainId.Mainnet], MOBI[ChainId.Mainnet]],

      externalRewards: {
        id: "8",
        sushiChef: sushiChefV2,
      },
    },
    {
      protocol: Protocol.Ubeswap,
      display: Ubeswap,
      wrapper: getAddress("0xFab4224Ce8E71e2f8F95f63a088d828d5B570e12"),
      spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
      lp: getAddress("0x0b81cf47c8f97275d14c006e537d5101b6c87300"),
      underlying: [CELO[ChainId.Mainnet], MOBI[ChainId.Mainnet]],

      externalRewards: {
        multistaking: MobiMSR,
      },
    },
    {
      protocol: Protocol.Ubeswap,
      display: Ubeswap,
      wrapper: getAddress("0x1B9dF6fd569778f48E7db3eB000C93a80920EA23"),
      spell: getAddress("0x7B775b2AF169D1249db545Cd89754D3C70FAd069"),
      lp: getAddress("0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c"),
      underlying: [CELO[ChainId.Mainnet], UBE[ChainId.Mainnet]],

      externalRewards: {
        multistaking: UbeMSR,
      },
    },
  ],
  [ChainId.Alfajores]: [],
  [ChainId.Baklava]: [],
} as const;
