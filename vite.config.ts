import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
  plugins: [react()],
  base:'/reactHome/',
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
  build:{
    // reportCompressedSize: false, // gzip压缩大小报告
    // chunkSizeWarningLimit: 2000, // 打包大小超出警告的限制
    assetsDir:'static/assets',
    rollupOptions:{
      output: {
        assetFileNames: (AssetInfo)=>{
          if(/\.(png|jpg|gif|svg)$/.test(AssetInfo.name)){
            return 'static/img/[name].[ext]'
          }else if(/\.(ttf|woff)$/.test(AssetInfo.name)){
            return 'static/font/[name].[hash].[ext]'
          }else{
            return 'static/[ext]/[name].[hash].[ext]'
          }
        },
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: 'static/js/[name].[hash].js',
      }
    }
  },
  esbuild:{
    drop: command === 'build' ? ['console','debugger'] : []
  }
}))
