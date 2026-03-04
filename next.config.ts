import type { NextConfig } from "next";

const userApiUrl = process.env.USER_API_URL || 'http://localhost:8081';
const accountApiUrl = process.env.ACCOUNT_API_URL || 'http://localhost:8082';
const transactionApiUrl = process.env.TRANSACTION_API_URL || 'http://localhost:8083';

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/user/:path*',
        destination: `${userApiUrl}/:path*`,
      },
      {
        source: '/api/account/:path*',
        destination: `${accountApiUrl}/:path*`,
      },
      {
        source: '/api/transaction/:path*',
        destination: `${transactionApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
