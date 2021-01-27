const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const buildcfg = {
  title: '办会端',
  port: 8080, // 本地服务端口号
  outputDir: 'client', // 打包输出文件名
  env: process.env.VUE_APP_TITLE, // 环境变量值
  publicPath: process.env.BASE_URL, // 打包后文件链接
  productionGzip: true, // 是否使用gzip
  productionGzipExtensions: ['js', 'css'], // 需要gzip压缩的文件后缀
  closeConsole: false, // 是否移除console
  sourcemapUpload: false, // 是否上传sourcemap到sentry
  gitBuild: true, // 是否启用git打包限制
  cdnFlag: false, // 是否启用cdn加载
  externals: { // 忽略打包
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios'
  }
}

const cdn = {
  dev: {
    css: [],
    js: []
  },
  prod: {
    css: [],
    js: []
  }
}
console.log(`环境变量：${buildcfg.env},
是否上传sourcemap到sentry：${buildcfg.sourcemapUpload},
打包后文件baseURL：${buildcfg.publicPath},
是否启用gzip压缩：${buildcfg.productionGzip},
是否移除console：${buildcfg.closeConsole},
是否启用cdn加载：${buildcfg.cdnFlag}
`)
module.exports = {
  publicPath: buildcfg.publicPath,
  outputDir: buildcfg.outputDir,
  lintOnSave: true,
  productionSourceMap: buildcfg.sourcemapUpload,
  chainWebpack: (config) => {
    config.module.rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader').end();
    config.module.rule('js').exclude.add(/\.worker\.js$/)
    if (~['analyz', 'production'].indexOf(buildcfg.env) && buildcfg.cdnFlag) {
      config.externals(buildcfg.externals)
    }
    config.plugin('html').tap(args => {
      args[0].title = buildcfg.title
      if (buildcfg.cdnFlag) {
        if (~['analyz', 'production'].indexOf(buildcfg.env)) {
          args[0].cdn = cdn.prod
        } else {
          args[0].cdn = cdn.dev
        }
      }
      return args
    })
  },
  configureWebpack: (config) => {
    if (~['analyz', 'production'].indexOf(buildcfg.env)) {
      config.mode = 'production'
      buildcfg.closeConsole && config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']
            }
          }
        })
      )
      buildcfg.productionGzip && config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + buildcfg.productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    } else {
      config.mode = 'development'
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/commons/css/var.scss";`
      }
    }
  },
  devServer: {
    open: false,
    disableHostCheck: true,
    port: buildcfg.port
  },
}