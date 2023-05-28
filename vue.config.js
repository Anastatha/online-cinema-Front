const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: 'http://localhost:7000'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `
      }
    }
  }
}

// module.exports = defineConfig({
//   transpileDependencies: true
// })
