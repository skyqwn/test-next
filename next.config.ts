import type { NextConfig } from "next";
// import dotenv from "dotenv";
import path from "path";

const envName = process.env.APP_ENV || process.env.NODE_ENV || "local";
// dotenv.config({
//   path: path.resolve(__dirname, "env", `.env.${envName}`),
// });

const nextConfig: NextConfig = {
  reactStrictMode: false, // 개발 모드에서 중복 렌더링 방지
  async rewrites() {
    const env = process.env.APP_ENV || process.env.NODE_ENV;
    // local일 때만 API 프록시 적용
      return [
        {
          source: "/api/v1/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_LOCAL}:path*`,
          // destination: `${process.env.NEXT_PUBLIC_API_SERVER}:path*`,
        },
      ];
  },
  env: {
    APP_ENV: envName,
    API_URL: process.env.API_URL, // 예: dev/staging/prod 별로 달라짐
    BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
