import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  server:{
    host:'0.0.0.0',
    port:8090,
    open:true,
    proxy:{
      '/api':{
        target:'http://103.113.6.179:8086',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  // css:{
  //   modules:{
  //     localsConvention:'camelCaseOnly',
  //     scopeBehaviour:'local'
  //   }
  // },
  build:{
    rollupOptions:{
      output: {
        assetFileNames: (AssetInfo)=>{
          if(/\.(png|jpg|gif|svg)$/.test(AssetInfo.name)){
            return 'img/[name].[ext]'
          }else if(/\.(ttf|woff)$/.test(AssetInfo.name)){
            return 'font/[name].[hash].[ext]'
          }else{
            return '[ext]/[name].[hash].[ext]'
          }
        },
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    }
  }
})
