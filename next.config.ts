
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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
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
      // Detaillierte Polyfills für Node.js-Module im Browser-Bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
        os: false,
        path: false,
        stream: false,
        crypto: false,
        buffer: false,
        util: false,
        vm: false,
        dns: false,
        http2: false,
        readline: false,
      };

      // Aggressives Aliasing, um Telemetrie-Module zu blockieren, die async_hooks erzwingen
      config.resolve.alias = {
        ...config.resolve.alias,
        '@opentelemetry/sdk-node': false,
        '@opentelemetry/context-async-hooks': false,
        '@opentelemetry/sdk-trace-node': false,
      };
    }
    return config;
  },
};

export default nextConfig;
