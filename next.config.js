/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'cf.shopee.com.br'],
  },
  i18n: {
    // providing the locales supported by your application
    locales: ["en-US","pt-BR"],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "pt-BR",
  },
}

module.exports = nextConfig
