import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 = artes de produto (seção de cotação); 75 = padrão
    qualities: [75, 85],
  },
  // O projeto vive no Google Drive e é executado via junctions em um runner
  // local (ver run.ps1). Mantém os caminhos sob o runner para que a resolução
  // de node_modules (Tailwind, React) funcione a partir de src/.
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
