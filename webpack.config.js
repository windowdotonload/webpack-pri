const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { Hash } = require('crypto');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      // 配置loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpeg|png|jpg)$/,
        loader: 'url-loader',
        options: {
          // 图片小于8kb，转化为base64处理
          // 下载url-loader,file-loader
          // url-loader依赖于file-loader
          limit: 8 * 1024,
          // 给图片重命名
          // 取hash值前十位，[ext]文件原扩展名
          name: '[Hash:10].[ext]'
        },
      },
      {
        // 处理html文件中的img图片引入
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      },
      // 打包其他资源
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};