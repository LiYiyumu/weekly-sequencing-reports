/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  // 静态导出时允许从环境变量读取内容仓库位置
  env: {
    HUB_DIR: process.env.HUB_DIR || "",
  },
};

export default nextConfig;
