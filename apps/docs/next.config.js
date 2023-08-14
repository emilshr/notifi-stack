/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["ui", "eslint-config-custom", "@emilshr/notifi", "tsconfig"],
};

module.exports = config;
