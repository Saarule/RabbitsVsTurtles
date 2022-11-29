const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

const CELO = {
  name: "Celo",
  symbol: "CELO",
  decimals: 18,
};

export const CHAINS = {
  1: {
    urls: [`https://mainnet.infura.io/v3/9b81098f432a446690d089d65bc3deb9`],
    WSurls: [],
    name: "Ethereum",
    symbol: "ethereum-icon",
    contractAddress: "",
  },
  // Goerli
  5: {
    urls: [`https://goerli.infura.io/v3/9b81098f432a446690d089d65bc3deb9`],
    WSurls: ['wss://eth-goerli.g.alchemy.com/v2/A4cu_U64cbZ_lySFcSxT73Q4N_ZQZChC'],
    name: "Goerli",
    symbol: "goerli-icon",
    contractAddress: "0xE7efc0e6Bf6A12F52cf725A3A164eEd8a9292237",
  },
  // Optimism
  10: {
    urls: [],
    WSurls: [],
    name: "Optimism",
    symbol: "optimism-icon",
    contractAddress: "",
  },
  // Arbitrum
  42161: {
    urls: [],
    WSurls: [],
    name: "Arbitrum",
    symbol: "arbitrum-icon",
    contractAddress: "",
  },
  // Polygon
  137: {
    urls: [
      `https://polygon-mainnet.infura.io/v3/9b81098f432a446690d089d65bc3deb9`,
    ],
    WSurls: ['wss://polygon-mainnet.g.alchemy.com/v2/2arFR52wPyKbFgPTwclErfm31zuLIW-y'],
    name: "Polygon",
    symbol: "polygon-icon",
    contractAddress: "0x829a67EF339E6230FcfDbf3c8730fFBb0329e796",
  },
  // Celo
  42220: {
    urls: ["https://forno.celo.org"],
    WSurls: [],
    name: "Celo",
    symbol: "celo-icon",
    contractAddress: "",
  },
};
