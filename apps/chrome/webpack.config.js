const path = require('path')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? false : 'cheap-module-source-map',
  entry: {
    background: path.resolve(__dirname, './src/background/main.ts'),
    content: path.resolve(__dirname, './src/content/main.ts'),
    inpage: path.resolve(__dirname, './src/inpage/main.ts'),
    popup: path.resolve(__dirname, './src/popup/main.tsx'),
  },
  output: {
    path: path.resolve(__dirname, './extension/dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext'
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 15000 } },
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/', to: './' }],
    }),
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        minify: false
      }),
    ],
  },
  devServer: {
    inline: false,
    hot: false,
    stats: 'minimal',
    contentBase: path.resolve(__dirname, './dist'),
    overlay: true,
    writeToDisk: true,
  },
})
