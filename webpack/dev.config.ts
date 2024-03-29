import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { resolve } from 'path';
import {
  mergeWithCustomize,
  customizeArray,
  CustomizeRule
} from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import baseConfig from './base.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const configuration: Configuration = mergeWithCustomize<Configuration>({
  customizeArray: customizeArray({
    'module.rules': CustomizeRule.Replace
  })
})(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8181,
    hot: true,
    onBeforeSetupMiddleware: devServer =>
      devServer.app.get('/terms-and-conditions/config.js', (_, res) =>
        res.status(204).send()
      )
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '..', 'babel.config.js'),
              plugins: ['react-refresh/babel']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '..', 'tsconfig.json'),
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@svgr/webpack'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        include: [
          resolve(__dirname, '..', 'node_modules/ansi-styles'),
          resolve(__dirname, '..', 'node_modules/chalk'),
          resolve(__dirname, '..', 'node_modules/react-dev-utils')
        ]
      },
      {
        test: /\.(js|ts)x?$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: { files: './src/**/*.{tsx,ts,jsx,js,json,html}' }
    })
  ]
});

export default configuration;
