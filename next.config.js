//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  async redirects() {
    return [
      {
        source: '/proxy/:url(.*)',
        destination: 'https://:url',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  crossOrigin: 'anonymous',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
