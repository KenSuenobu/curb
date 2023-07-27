const { withGlobalCss } = require('next-global-css');
const withConfig = withGlobalCss();

module.exports = withConfig({
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
});

console.log(
  'Redirecting /app/* to http://localhost:3001/*'
);

console.log('Allowing Global CSS');

