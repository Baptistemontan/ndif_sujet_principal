const withPlugins = require("next-compose-plugins");
const nextTranslate = require("next-translate");

const date = new Date();

const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_BUILD_TIME: date.toString(),
    NEXT_PUBLIC_APP_BUILD_TIMESTAMP: +date,
  },
  reactStrictMode: true,
};

// module.exports = {
//   ...nextTranslate(),
// };



module.exports = withPlugins([nextTranslate], nextConfig);
