/* eslint-disable max-len */
import BinanceSmartChain from "../../public/assets/images/svg/blockchains/bsc.svg";
import Ethereum from "../../public/assets/images/svg/blockchains/ethereum.svg";
import Polygon from "../../public/assets/images/svg/blockchains/polygon.svg";

import BUSD from "../../public/assets/images/svg/tokens/busd.svg";
import USDC from "../../public/assets/images/svg/tokens/usdc.svg";
import USDT from "../../public/assets/images/svg/tokens/usdt.svg";
import WBTC from "../../public/assets/images/svg/tokens/wbtc.svg";
import LINK from "../../public/assets/images/svg/tokens/link.svg";
import AAVE from "../../public/assets/images/svg/tokens/aave.svg";
import EURS from "../../public/assets/images/svg/tokens/eurs.svg";
import JEUR from "../../public/assets/images/svg/tokens/jeur.svg";
import AGEUR from "../../public/assets/images/svg/tokens/ageur.svg";
import GHST from "../../public/assets/images/svg/tokens/ghst.svg";
import DAI from "../../public/assets/images/svg/tokens/dai.svg";

export interface Coin extends NativeCoin {
  address: string;
}

export interface NativeCoin {
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
}

export interface Network {
  name: string;
  icon: string;
  rpc: string;
  chainId: number;
  blockExplorerUrls: string[];
  active: boolean;
  contractAddress?: string;
  contractFactoryAddress?: string;
  contractLensAddress?: string;
  contractAavePoolAddress?: string;
  nativeCurrency?: NativeCoin;
  supportedStableCoinsDol?: Coin[];
  supportedCoins?: Coin[];
  supportedStableCoinsEur?: Coin[];
}

export function getNetwork(chainId: number | undefined): Network {
  if (!chainId) {
    throw new Error("No chainId specified");
  }
  const network = networks.find((n) => n.chainId === chainId);
  if (!network) {
    throw new Error(
      "Unable to find Network with chainId: " + chainId.toString()
    );
  }
  return network;
}

const getRandomRPC = (rpcString: string): string => {
  const rpcList = rpcString.split(",");
  const index = Math.floor(Math.random() * rpcList.length);
  return rpcList[index] as string;
};

const getSupportedChainIds = (): number[] => {
  const chainsIds: number[] = [];
  const splitted = process.env.NETWORK.split("|");
  splitted.forEach((chainId) => {
    if (chainId && chainId != "" && chainId != undefined) {
      chainsIds.push(Number(chainId));
    }
  });
  return chainsIds;
};

export const chainIds = getSupportedChainIds();

export const networks: Network[] = [
  {
    name: "Ethereum",
    icon: Ethereum,
    rpc: getRandomRPC(
      "https://mainnet.infura.io/v3/0c94aec7289f455ab6dd1aa270acce0c"
    ),
    chainId: 1,
    active: chainIds.indexOf(1) > 0,
    contractAddress: "0x0",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "USDT",
        symbol: "USDT",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        icon: USDT,
        decimals: 6,
      },
      {
        name: "USDC",
        symbol: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        icon: USDC,
        decimals: 6,
      },
    ],
  },
  {
    name: "Goerli",
    icon: Ethereum,
    rpc: getRandomRPC(
      "https://eth-goerli.g.alchemy.com/v2/GQmJcHqdJX4mkZbpybS0KH5c7z7oDcGl"
    ),
    chainId: 5,
    active: chainIds.indexOf(5) > 0,
    contractAddress: "0xBb8396f4ccc2D25042CC733a227c1B3e64B29b1d",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "USDC",
        symbol: "USDC",
        address: "0x59E00d31Fe1eC64e95Ba6E224AC19040aAd7f5A7",
        icon: BUSD,
        decimals: 6,
      },
    ],
  },
  {
    name: "Binance Smart Chain",
    icon: BinanceSmartChain,
    rpc: getRandomRPC(
      "https://bsc-dataseed.binance.org/,https://bsc-dataseed1.defibit.io/,https://bsc-dataseed1.ninicoin.io/"
    ),
    chainId: 56,
    active: chainIds.indexOf(56) > 0,
    contractAddress: "0x0",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "BUSD",
        symbol: "BUSD",
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        icon: BUSD,
        decimals: 18,
      },
    ],
  },
  {
    name: "BSC Test",
    icon: BinanceSmartChain,
    rpc: getRandomRPC("https://data-seed-prebsc-2-s3.binance.org:8545/"),
    chainId: 97,
    active: chainIds.indexOf(97) > 0,
    contractAddress: "0x539a0872C99728462fb8C26Ca80b4011ea24F3E0",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "BUSD",
        symbol: "BUSD",
        address: "0x7E187C16fdD4CB394727570F62b15C1287B8849F",
        icon: BUSD,
        decimals: 18,
      },
    ],
  },
  {
    name: "Mumbai",
    icon: Polygon,
    rpc: getRandomRPC("https://rpc-mumbai.maticvigil.com/"),
    chainId: 80001,
    active: chainIds.indexOf(80001) > 0,
    contractAddress: "0x25e38433127d8eBDBf54198A3f06A328ecad554f",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "USDC",
        symbol: "USDC",
        address: "0x88E22BE47D7539b2B1Dc4274d44483e252003642",
        icon: USDC,
        decimals: 18,
      },
    ],
  },
  {
    name: "Polygon",
    icon: Polygon,
    rpc: getRandomRPC("https://polygon-rpc.com/"),
    chainId: 137,
    active: chainIds.indexOf(137) > 0,
    contractAddress: "0x0",
    contractFactoryAddress: "0x648cE75895873BECBC4c9a291A28CA1EF121953B",
    contractLensAddress: "0xAe3C2d45270791Ef8aD023D1E66d275255db0499",
    contractAavePoolAddress: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
    blockExplorerUrls: [""],
    supportedStableCoinsDol: [
      {
        name: "USDT",
        symbol: "USDT",
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        icon: USDT,
        decimals: 6,
      },
      {
        name: "USDC",
        symbol: "USDC",
        address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        icon: USDC,
        decimals: 6,
      },
      {
        name: "DAI",
        symbol: "DAI",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        icon: USDC,
        decimals: 18,
      },
      {
        name: "GDAI",
        symbol: "GDAI",
        address: "0x91993f2101cc758D0dEB7279d41e880F7dEFe827",
        icon: USDC,
        decimals: 18,
      },
      {
        name: "GHST",
        symbol: "GHST",
        address: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
        icon: USDC,
        decimals: 18,
      },
      {
        name: "VGHST",
        symbol: "VGHST",
        address: "0x51195e21BDaE8722B29919db56d95Ef51FaecA6C",
        icon: USDC,
        decimals: 18,
      },
    ],
    supportedStableCoinsEur: [
      {
        name: "EURS",
        symbol: "EURS",
        address: "0xe111178a87a3bff0c8d18decba5798827539ae99",
        icon: EURS,
        decimals: 18,
      },
      {
        name: "JEUR",
        symbol: "JEUR",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        icon: JEUR,
        decimals: 18,
      },
    ],
    supportedCoins: [
      {
        name: "AAVE",
        symbol: "AAVE",
        address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
        icon: AAVE,
        decimals: 18,
      },
      {
        name: "WBTC",
        symbol: "WBTC",
        address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
        icon: WBTC,
        decimals: 8,
      },
      {
        name: "LINK",
        symbol: "LINK",
        address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "MIMATIC",
        symbol: "MIMATIC",
        address: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "Balancer",
        symbol: "BAL",
        address: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "Curve",
        symbol: "CRV",
        address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "DPI",
        symbol: "DPI",
        address: "0x85955046df4668e1dd369d2de9f3aeb98dd2a369",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "MATICX",
        symbol: "MATICX",
        address: "0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "WETH",
        symbol: "WETH",
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "WSTETH",
        symbol: "WSTETH",
        address: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "WMATIC",
        symbol: "WMATIC",
        address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "STMATIC",
        symbol: "STMATIC",
        address: "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
        icon: LINK,
        decimals: 18,
      },
      {
        name: "SUSHI",
        symbol: "SUSHI",
        address: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
        icon: LINK,
        decimals: 18,
      },
    ],
  },
];

export const supportedStableCoinsDol = [
  {
    name: "USDT",
    symbol: "USDT",
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    icon: USDT,
    decimals: 6,
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    icon: USDC,
    decimals: 6,
  },
  {
    name: "DAI",
    symbol: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    icon: DAI,
    decimals: 18,
  },
  {
    name: "GDAI",
    symbol: "GDAI",
    address: "0x91993f2101cc758D0dEB7279d41e880F7dEFe827",
    icon: DAI,
    decimals: 18,
  },
  {
    name: "GHST",
    symbol: "GHST",
    address: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
    icon: GHST,
    decimals: 18,
  },
  {
    name: "VGHST",
    symbol: "VGHST",
    address: "0x51195e21BDaE8722B29919db56d95Ef51FaecA6C",
    icon: GHST,
    decimals: 18,
  },
];

export const supportedStableCoinsEur = [
  {
    name: "EURS",
    symbol: "EURS",
    address: "0xe111178a87a3bff0c8d18decba5798827539ae99",
    icon: EURS,
    decimals: 2,
  },
  {
    name: "JEUR",
    symbol: "JEUR",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    icon: JEUR,
    decimals: 18,
  },
  {
    name: "AGEUR",
    symbol: "AGEUR",
    address: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    icon: AGEUR,
    decimals: 18,
  },
];
export const supportedCoins = [
  {
    name: "AAVE",
    symbol: "AAVE",
    address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    icon: AAVE,
    decimals: 18,
  },
  {
    name: "WBTC",
    symbol: "WBTC",
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    icon: WBTC,
    decimals: 18,
  },
  {
    name: "LINK",
    symbol: "LINK",
    address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "MIMATIC",
    symbol: "MIMATIC",
    address: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "Balancer",
    symbol: "BAL",
    address: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "Curve",
    symbol: "CRV",
    address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "DPI",
    symbol: "DPI",
    address: "0x85955046df4668e1dd369d2de9f3aeb98dd2a369",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "MATICX",
    symbol: "MATICX",
    address: "0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "WETH",
    symbol: "WETH",
    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "WSTETH",
    symbol: "WSTETH",
    address: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "WMATIC",
    symbol: "WMATIC",
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "STMATIC",
    symbol: "STMATIC",
    address: "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
    icon: LINK,
    decimals: 18,
  },
  {
    name: "SUSHI",
    symbol: "SUSHI",
    address: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
    icon: LINK,
    decimals: 18,
  },
];

interface Pair {
  pairName: string;
  tvPairName: string;
  coinCollateral: Coin;
  coinBorrow: Coin;
}

export const supportedPairs: Pair[] = [
  {
    pairName: "USDC:EURS",
    tvPairName: "CRYPTO:EURSUSD",
    coinCollateral: supportedStableCoinsDol.find((c) => c.symbol === "USDC")!,
    coinBorrow: supportedStableCoinsEur.find((c) => c.symbol === "EURS")!,
  },
  {
    pairName: "AGEUR:USDC",
    tvPairName: "UNISWAP3ETH:AGEURUSDC",
    coinCollateral: supportedStableCoinsEur.find((c) => c.symbol === "AGEUR")!,
    coinBorrow: supportedStableCoinsDol.find((c) => c.symbol === "USDC")!,
  },
  {
    pairName: "USDC:USDT",
    tvPairName: "UNISWAP3POLYGON:USDCUSDT",
    coinCollateral: supportedStableCoinsDol.find((c) => c.symbol === "USDC")!,
    coinBorrow: supportedStableCoinsDol.find((c) => c.symbol === "USDT")!,
  },

  {
    pairName: "USDT:GHST",
    tvPairName: "USDCUSDT",
    coinCollateral: supportedStableCoinsDol.find((c) => c.symbol === "USDT")!,
    coinBorrow: supportedStableCoinsDol.find((c) => c.symbol === "GHST")!,
  },
];

export const ALL_COINS = [
  ...supportedCoins,
  ...supportedStableCoinsDol,
  ...supportedStableCoinsEur,
];

export const addressesAaveATokens: {
  [asset: string]: { [chainId: number]: string };
} = {
  AAVE: {
    137: "0xf329e36C7bF6E5E86ce2150875a84Ce77f477375",
    80001: "0xB695309240e72Fc0244E8aF58b2f6A13b2930502",
    5: "0xAC4D92980562Ac11Af46C6C7CEdD7C819C2028D0",
  },
  AGEUR: {
    80001: "0x605d3B24D146d202E15f55139c160c492D9F945e",
    137: "0x8437d7c167dfb82ed4cb79cd44b7a32a1dd95c77",
  },
  BAL: {
    137: "0x8ffDf2DE812095b1D19CB146E4c004587C0A0692",
    80001: "0x85c530cf815F842Bd7F9f1C41Ed81a6a54719375",
  },
  CRV: {
    80001: "0x4582d6B1c50345d9CF74d2cF5F130141d0BBA595",
    137: "0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf",
  },
  DAI: {
    80001: "0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9",
    5: "0x7402b9625D1712426807952b798e3180dC38876F",
    137: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
  },
  DPI: {
    80001: "0x3Ae14a7486b3c7bfB93C1368249368a4458Fd557",
    137: "0x724dc807b04555b71ed48a6896b6F41593b8C637",
  },
  EURS: {
    80001: "0x7948efE934B6a7D24B17032D81cB9CD489C68Df0",
    137: "0x38d693cE1dF5AaDF7bC62595A37D667aD57922e5",
  },
  GHST: {
    80001: "0x1687666e4ffA0f45c1B6701720E32f79b1B24036",
    137: "0x8Eb270e296023E9D92081fdF967dDd7878724424",
  },
  JEUR: {
    137: "0x6533afac2E7BCCB20dca161449A13A32D391fb00",
    80001: "0x07931E5fA73f30Ae626C5809A736A7a7374a1320",
  },
  LINK: {
    80001: "0x60f42c880B61D9114251882fC144395843D9839d",
    5: "0x601c61Fc4eEe64a4b1f5201125b788dc1585746b",
    137: "0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530",
  },
  SUSHI: {
    80001: "0xD9EB7E2FEcA3132A1bd8EB259C26717935488f04",
    137: "0xc45A479877e1e9Dfe9FcD4056c699575a1045dAA",
  },
  USDC: {
    137: "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
    80001: "0x9daBC9860F8792AeE427808BDeF1f77eFeF0f24E",
    5: "0xdC916609281306558E0e8245bFBf90EFd3eCAb96",
  },
  USDT: {
    137: "0x6ab707Aca953eDAeFBc4fD23bA73294241490620",
    80001: "0xEF4aEDfD3552db80E8F5133ed5c27cebeD2fE015",
  },
  WBTC: {
    80001: "0x7aF0Df3DD1b8ee7a70549bd3E3C902e7B24D32F9",
    137: "0x078f358208685046a11C85e8ad32895DED33A249",
  },
  WETH: {
    80001: "0xAA02A95942Cb7d48Ac8ad8C3b5D65E546eC3Ecd3",
    5: "0x49871B521E44cb4a34b2bF2cbCF03C1CF895C48b",
    137: "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8",
  },
  WMATIC: {
    80001: "0xC0e5f125D33732aDadb04134dB0d351E9bB5BCf6",
    137: "0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97",
  },
  MIMATIC: {
    137: "0xeBe517846d0F36eCEd99C735cbF6131e1fEB775D",
  },
  MATICX: {
    137: "0x80cA0d8C38d2e2BcbaB66aA1648Bd1C7160500FE",
  },
  STMATIC: {
    137: "0xEA1132120ddcDDA2F119e99Fa7A27a0d036F7Ac9",
  },
  GHO: {
    5: "0xdC25729a09241d24c4228f1a0C27137770cF363e",
  },
};

export const addressesAaveVTokens = {
  AAVE: {
    5: "0xCB62E1d181179d1D86D3877e221D1EdE0bDD8841",
    80001: "0xe4Fd5bEe63f91e784da0C1f7C1Dc243305f65bBd",
    137: "0xE80761Ea617F66F96274eA5e8c37f03960ecC679",
  },
  AGEUR: {
    137: "0x3ca5fa07689f266e907439afd1fbb59c44fe12f6",
    80001: "0x928fD606dDD48C199462B5D12f4693e5E6F5010B",
  },
  BAL: {
    137: "0xA8669021776Bc142DfcA87c21b4A52595bCbB40a",
    80001: "0x53590ef864856C156e1D403e238746EE3a2824e5",
  },
  CRV: {
    137: "0x77CA01483f379E58174739308945f044e1a764dc",
    80001: "0xef7dF8bc0F410a620Fe730fCA028b9322f8e501b",
  },
  DAI: {
    137: "0x8619d80FB0141ba7F184CbF22fd724116D9f7ffC",
    5: "0x76f5D888234e88599c12D46A2a55Fece923cf48c",
    80001: "0xBc4Fbe180979181f84209497320A03c65E1dc64B",
  },
  DPI: {
    137: "0xf611aeb5013fd2c0511c9cd55c7dc5c1140741a6",
    80001: "0x6ECCb955323B6C25a4D20f98b0Daed670ef302d4",
  },
  EURS: {
    80001: "0x61328728b2efd74224E9e524b50ef36a557f98Ec",
    137: "0x5D557B07776D12967914379C71a1310e917C7555",
  },
  GHST: {
    80001: "0x8B422A12C2CD22a9F0FE84E97B6D7e51AA09bDD4",
    137: "0xce186f6cccb0c955445bb9d10c59cae488fea559",
  },
  JEUR: {
    80001: "0x3048572a85336A4c74B9B7e51ebf08f6bBD6B7f9",
    137: "0x44705f578135cC5d703b4c9c122528C73Eb87145",
  },
  LINK: {
    5: "0x91eFc3Ff5fBD2f9b2aE8880Bb1d52Db3e01A261d",
    80001: "0x97BDaa1fD8bdb266f73C0E6095F39aa168d4509c",
    137: "0x953A573793604aF8d41F306FEb8274190dB4aE0e",
  },
  SUSHI: {
    80001: "0x2FB450BAec43498198aA615E184c54Dc4E62B640",
    137: "0x34e2eD44EF7466D5f9E0b782B5c08b57475e7907",
  },
  USDC: {
    5: "0x908636F60d276a3b30C13F300065E1Cf43bf49cf",
    80001: "0xdbFB1eE219CA788B02d50bA687a927ABf58A8fC0",
    137: "0xFCCf3cAbbe80101232d343252614b6A3eE81C989",
  },
  USDT: {
    80001: "0xbe9B550142De795A54d5BBec50ab562a95b303B4",
    137: "0xfb00AC187a8Eb5AFAE4eACE434F493Eb62672df7",
  },
  WBTC: {
    80001: "0x6b447f753e08a07f108A835A70E3bdBE1F6233e2",
    137: "0x92b42c66840C7AD907b4BF74879FF3eF7c529473",
  },
  WETH: {
    5: "0x86065184932b2e2E7bC2BC953Cd3d131d2497cDe",
    80001: "0x71Cf6ef87a3b0B7ceaacA66daB39b81972466B83",
    137: "0x0c84331e39d6658Cd6e6b9ba04736cC4c4734351",
  },
  WMATIC: {
    80001: "0x3062CEfc74220dcB7341d268653F9ACAe8fB1107",
    137: "0x4a1c3aD6Ed28a636ee1751C69071f6be75DEb8B8",
  },
  MIMATIC: {
    137: "0x18248226C16BF76c032817854E7C83a2113B4f06",
  },
  MATICX: {
    137: "0x18248226C16BF76c032817854E7C83a2113B4f06",
  },
  STMATIC: {
    137: "0x18248226C16BF76c032817854E7C83a2113B4f06",
  },
  GHO: {
    5: "0x80aa933EfF12213022Fd3d17c2c59C066cBb91c7",
  },
};

export const addressesTokens = {
  DAI: {
    1: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    137: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  UNI: {
    1: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  },
  USDC: {
    1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    137: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
  USDT: {
    1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    137: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  },
  WBTC: {
    1: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    137: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  },
  COMP: {
    1: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  },
  ZRX: {
    1: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
  },
  YFI: {
    1: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  },
  WBTC2: {
    1: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  },
  USDP: {
    1: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
  },
  FEI: {
    1: "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
  },
  LINK: {
    1: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    137: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
  },
  MKR: {
    1: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
  },
  REP: {
    1: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
  },
  AAVE: {
    1: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    137: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
  },
  BAT: {
    1: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
  },
  AGEUR: {
    137: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
  },
  EURS: {
    137: "0xe111178a87a3bff0c8d18decba5798827539ae99",
  },
  JEUR: {
    137: "0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
  },
  MIMATIC: {
    137: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
  },
  BAL: {
    137: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
  },
  CRV: {
    137: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
  },
  DPI: {
    137: "0x85955046df4668e1dd369d2de9f3aeb98dd2a369",
  },
  GHST: {
    137: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
  },
  MATICX: {
    137: "0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
  },
  STMATIC: {
    137: "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
  },
  SUSHI: {
    137: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
  },
  WETH: {
    137: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  },
  WMATIC: {
    137: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  VGHST: {
    137: "0x51195e21BDaE8722B29919db56d95Ef51FaecA6C",
  },
  GDAI: {
    137: "0x91993f2101cc758D0dEB7279d41e880F7dEFe827",
  },
  WSTETH: {
    137: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
  },
};
