const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const appProxy = createProxyMiddleware({
        target: 'https://localhost:7164',
        secure: false
    });

    app.use("/api", appProxy);
};
