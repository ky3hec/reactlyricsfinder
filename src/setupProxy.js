const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
module.exports = (app) => {
  const ROOT_PATH = {
    target: "https://api.musixmatch.com/ws/1.1/",
    changeOrigin: true,
    pathRewrite: {
      "^/tracks/lyrics/": "",
    },
    logLevel: "debug",
  };

  app.use(
    ["/chart.tracks.get?", "/tracks/lyrics/*", "/track.search?"],
    createProxyMiddleware(ROOT_PATH)
  );
  app.use(morgan("common"));
};
