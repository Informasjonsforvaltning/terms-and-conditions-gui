import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig from './base.config';

export default merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        mainVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `main.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'main'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
      base: '/terms-and-conditions',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/auth/index.html',
      filename: 'auth.html',
      favicon: './src/images/favicon.ico',
      base: '/terms-and-conditions'
    })
  ]
});
