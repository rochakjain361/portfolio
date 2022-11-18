import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const BUILD_REPOSITORY = 'rochakjain361.github.io'

/**
 * Parameters passed through command-line
 *
 * [
 *   '/usr/local/bin/node',
 *   'portfolio/node_modules/.bin/webpack-dev-server',
 *   '--mode',
 *   'development',
 *   '--hot'
 * ]
 */
const mode = process.argv[3]

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, BUILD_REPOSITORY),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCaseOnly',
              modules: {
                localIdentName:
                  mode === 'production' ? '[hash:base64]' : '[path][local]',
              },
              importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|svg|pdf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: (resourcePath): string => {
              if (/.*\.pdf/.test(resourcePath)) {
                return '[name].[ext]'
              } else {
                return '[contenthash].[ext]'
              }
            },
          },
        },
      },
    ],
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}

export default config
