import { Configuration, ProvidePlugin } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configuration: Configuration = {
  entry: {
    main: './src/entrypoints/main/index.tsx',
    auth: './src/entrypoints/auth/index.ts'
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: { path: require.resolve('path-browserify') }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        mainVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'main.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'main'
        },
        authVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'auth.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'auth'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '..', 'babel.config.js')
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '..', 'tsconfig.json')
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
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico',
      base: '/',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/auth/index.html',
      filename: 'auth.html',
      favicon: './src/images/favicon.ico',
      base: '/',
      chunks: ['auth']
    }),
    new ProvidePlugin({
      process: 'process',
      util: 'util'
    })
  ]
};

export default configuration;