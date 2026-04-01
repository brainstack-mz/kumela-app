import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* outras opções aqui */

  // Remove ESLint do config
  typescript: {
    ignoreBuildErrors: true, // ainda funciona
  },
};

export default nextConfig;