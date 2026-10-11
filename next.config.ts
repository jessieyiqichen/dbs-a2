import type { NextConfig } from "next";

// A static site: every page is built to HTML at build time, nothing runs on a server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
