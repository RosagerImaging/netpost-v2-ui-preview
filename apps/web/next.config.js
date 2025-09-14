/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/home/optiks/dev/netpost-v2/ui-preview'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
