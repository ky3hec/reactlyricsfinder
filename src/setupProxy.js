const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  const PROXY_OBJECT = {
    target: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_CHART_TRACKS_URL}`,
    changeOrigin: true,
  };
  app.use(
    `${process.env.REACT_APP_CHART_TRACKS_URL}`,
    createProxyMiddleware(PROXY_OBJECT)
  );
  console.log(PROXY_OBJECT);
};
