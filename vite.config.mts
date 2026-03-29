import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
// Plugins
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts-next' // 2. Layout Plugin
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import Fonts from 'unplugin-fonts/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    target: browserslistToEsbuild(),
    modulePreload: {
      polyfill: false,
    },
    outDir: 'osd2web-tiny',
    emptyOutDir: true
  },
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
      custom: {
        families: [
          {
            name: 'Material Design Icons',
            local: 'Material Design Icons',
            src: './node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2',
          },
        ],
        display: 'block',
        preload: false,
      },
    }),
    {
      name: 'exclude-unused-fonts',
      // Dieser Hook wird aufgerufen, bevor Vite ein Asset generiert
      generateBundle(_, bundle) {
        for (const fileName in bundle) {
          // Prüfe auf die Dateiendungen, die du NICHT willst
          if (fileName.match(/\.(ttf|eot|woff|otf)$/)) {
            delete bundle[fileName]
            console.log(`🗑️  Asset entfernt: ${fileName}`)
          }
        }
      },
    },
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
