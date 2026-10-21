/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/', destination: '/he/home', permanent: true },
      { source: '/:lang(he|en)', destination: '/:lang/home', permanent: true },
    ];
  },
};
