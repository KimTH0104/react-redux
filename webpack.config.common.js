// Requiring dependencies
// ================================================================================
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import config from 'config';
import fs from 'fs';

import { SHOULD_BUILD } from './bin/shouldBuild';

// trace which loader is deprecated
// feel free to remove that if you don't need this feature
process.traceDeprecation = false;

// Please read the following link if
// you have no idea how to use this feature
// https://github.com/motdotla/dotenv
if(!SHOULD_BUILD) {
  require('dotenv').config({silent: true});
}

// Environment variable injection
// ================================================================================
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
process.env.PACKAGE_VERSION = version;

// Defining config variables
// ================================================================================
const BUILD_PATH = path.join(__dirname, 'docroot');

const COMMON_LOADERS = [
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: 'assets/[hash].[ext]',
        }
      },
      {
        loader: 'image-webpack-loader',
        options: {
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: true,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          },
        }
      }
    ],
  }, {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        'transform-runtime',
        'transform-decorators-legacy',
        'syntax-dynamic-import'
      ],
    },
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.pdf$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ],
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        }
      }
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
        }
      }
    ],
  }
];

// Export
// ===============================================================================
export const JS_SOURCE = config.get('jsSourcePath');

export default {
  output: {
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'assets'),
      path.join(__dirname, JS_SOURCE),
      "node_modules"
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    rules: COMMON_LOADERS,
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    console:true,
    fs:'{}',
    tls:'{}',
    net:'{}'
  },
};
