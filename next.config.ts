
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Radikale Deaktivierung von Node-Modulen für den statischen Export
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        os: false,
        path: false,
        stream: false,
        crypto: false,
        buffer: false,
        util: false,
      };

      // Blockiert Telemetrie-Module, die async_hooks erzwingen
      config.resolve.alias = {
        ...config.resolve.alias,
        '@opentelemetry/api': false,
        '@opentelemetry/sdk-node': false,
        '@opentelemetry/context-async-hooks': false,
        '@opentelemetry/sdk-trace-node': false,
        'genkit': false, // Verhindert das Laden des Genkit-Kerns im Browser-Bundle
      };
    }
    return config;
  },
};

export default nextConfig;
