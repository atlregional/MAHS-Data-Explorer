require('dotenv').config();
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => app.use(createProxyMiddleware("/*", 
process.env.NODE_ENV !== 'production' ?
{ target: "http://localhost:3001" }
: { target: `${__dirname}:${process.env.PORT}/`}));