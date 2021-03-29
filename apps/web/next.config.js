module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign/in',
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
};
