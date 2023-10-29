/** @type {import('next').NextConfig} */
// const nextConfig = {}
//
// module.exports = nextConfig

const { withGlobalCss } = require('next-global-css');
const withConfig = withGlobalCss();

module.exports = withConfig({
  async rewrites() {
    return [
      {
        source: "/curb/:path*",
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
});

console.log(
  'Redirecting /curb/* to http://localhost:3001/*'
);

console.log('Allowing Global CSS');

