module.exports = {
  reactStrictMode: true,
  experimental: {
    modern: true,
    scss: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        },
      ],
    })
    return config
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: "Cache-Control",
            value: "public; max-age=60, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: '/:other',
        headers: [
          {
            key: "Cache-Control",
            value: "public; max-age=60, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: '/api/:any',
        headers: [
          {
            key: "Cache-Control",
            value: "public; max-age=20, stale-while-revalidate=60",
          },
        ],
      },
    ]
  }
}
