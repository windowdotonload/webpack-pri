const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const workboxWebpackPlugin = require("workbox-webpack-plugin")

process.env.NODE_ENV = 'development'
module.exports = {
  // mode为production会自动压缩js代码
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/[name].bundle.[hash:10].js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      // 配置loader
      {
        test: /\.css$/,
        // style-loader创建style标签，将样式放入
        // css-loader将css文件整合到js文件中
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 普通loader配置'postcss-loader'
          // 修改loader配置
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     // 帮忙postcss在package.json中找到browerslist
          //     // 开发还是生产环境变量需要设置node环境变量  process.env.NODE_ENV
          //     plugins: () => [
          //       // postcss插件
          //       require("postcss-preset-env")()
          //     ]
          //   }
          // }
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
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
          outputPath: 'assets',
        },
      },
      {
        // 处理html文件中的img图片引入
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      // 打包其他资源
      {
        // exclude:除这些文件之外的文件打包
        exclude: /\.(css|js|html|jpeg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
      // eslint-loader ,eslint,排除第三方库中的文件
      // 设置检查规则 package.json   airbnb
      // airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     // 自动修复
      //     fix: true,
      //   },
      // },
      {
        // 只能转换基本语法 promise之类的无法转换
        // 基本js --> @babel/preset-env
        // 全部js --> @babel/polyfill  直接在代码中直接引入 import "@babel/polyfill" 缺点：所有兼容性问题全部处理，文件体积过大
        // 按需加载处理，只处理需要处理  core-js
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                // 按需加载
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3
                  },
                  // 指定到兼容哪个浏览器
                  // targets: "defaults"
                  targets: {
                    chrome: "60"
                  }
                },
              ]
            ],
            // 开启babel缓存
            cacheDirectory: true
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    // 单独打包css文件
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    // 压缩css文件
    new optimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new workboxWebpackPlugin.GenerateSW({
      // 帮助serviceworker快速启动
      // 删除旧的serviceworker
      // 生成一个serviceworker配置文件
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  // sourcemap
  devtool: 'source-map',
  // 开发服务器
  // 只会在内存中编译打包，不会有任何实际物理上的输出
  // 启用devServer指令，webpack-dev-server   npx webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    // 开启热更新 HMR
    hot: true
  },
}