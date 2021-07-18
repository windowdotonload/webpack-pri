const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
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
          name: '[hash:10].[ext]',
          // 给图片重命名
          // 取hash值前十位，[ext]文件原扩展名
          esModule: false,
          outputPath: 'assets'
        },
      },
      {
        // 处理html文件中的img图片引入
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        }
      },
      // 打包其他资源
      {
        // exclude:除这些文件之外的文件打包
        exclude: /\.(css|js|html|jpeg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets'
        }
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
  // 开发服务器
  // 只会在内存中编译打包，不会有任何实际物理上的输出
  // 启用devServer指令，webpack-dev-server   npx webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8080,
  }
};