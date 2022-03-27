/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "cdn.sanity.io"],
  },
  env: {
    PUBLIC_TARGET_CHAIN_ID: 1, // Rinkeby - 4, Mainnet - 1
    ETHERSCAN_URL: "https://etherscan.io",
    SANITY_PROJECT_ID: 'lp8xmnox',
    METAMASK_INSTALL_URL: 'https://metamask.io/download/'
  },
};
