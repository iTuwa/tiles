/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index.html',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/secureproxy.php', destination: '/api/secureproxy' },
      { source: '/secureproxy', destination: '/api/secureproxy' },
    ];
  },
};

module.exports = nextConfig;
