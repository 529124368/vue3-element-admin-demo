const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //lintOnSave:false,
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
    }
  }
})
