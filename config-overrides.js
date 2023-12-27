const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm$/;
  config.resolve.extensions.push('.wasm');
  config.experiments = {
    asyncWebAssembly: true
  };

  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "process/browser": require.resolve('process/browser'),
    "buffer": require.resolve('buffer'),
  });
  config.resolve.fallback = fallback;

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.type === "asset/resource") {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    
  ]);

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  // If you really need to externalize 'path'
  config.externals = {
    'node:path': path,
    'node:fs': fs,
  };

  return config;
};