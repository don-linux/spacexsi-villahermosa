import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // 75 is Next's default. 90 is for source artwork that should stay sharp.
    qualities: [75, 90],
  },
  // Bottom-right is the playlist control. Bottom-left is the theme toggle on /creditos.
  devIndicators: { position: 'top-left' },
  turbopack: {
    rules: {
      '*.css': {
        // CSS modules must stay on Next's own pipeline. This loader emits plain CSS and drops the
        // class map, which is what left /creditos unstyled.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
