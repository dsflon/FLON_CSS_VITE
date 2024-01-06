import { resolve } from 'path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';

const DIST_DIR = resolve(__dirname, 'dist');

const SRC_PATH = resolve(__dirname, 'src');
const ROOT_PATH = resolve(__dirname, 'src');

const OUTPUT_PATH = resolve(DIST_DIR, ``);

const HTML_ENTRIES = `${SRC_PATH}/**/*.html`;
const CSS_ENTRIES = `${SRC_PATH}/assets/floncss/*.css`
const JS_ENTRIES = `${SRC_PATH}/assets/js/*.js`;

export default defineConfig({
  plugins: [],

	server: {
    port: 3000,
		host: true, // IPアドレスを有効化
    base: './dist'
	},

  // index.html の場所
  root: ROOT_PATH,

  // 静的ファイルの場所（デフォルトでpublic）
  publicDir: resolve(__dirname, 'public'),

  resolve: {
    alias: {
      '@floncss': resolve(__dirname, `${SRC_PATH}/assets/floncss`),
      '@src': resolve(__dirname, `${SRC_PATH}/assets`),
    },
  },

  css: {
    devSourcemap: true // this one
  },

  build: {
    outDir: OUTPUT_PATH,
		emptyOutDir: true,
		// manifest: true,
		// target: 'es2018',
    modulepreload: false,
    polyfillModulePreload: false,
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,

    rollupOptions: {
      input: glob.sync([HTML_ENTRIES, CSS_ENTRIES, JS_ENTRIES]),

			output: {
				entryFileNames: ({ name, facadeModuleId }) => {
          if ( /\.js$/.test(facadeModuleId) ) {
            return `assets/js/[name].js`;
          }

          return 'assets/[name].js';
        },
				chunkFileNames: `[name].js`,
				assetFileNames: ({ name }) => {
					if ( /\.(ttf|otf|eot|woff|woff2|)$/.test(name ?? '') ) {
						return 'assets/fonts/[name].[ext]';
					}
					if ( /\.(gif|jpeg|jpg|png|svg|webp|)$/.test(name ?? '') ) {
						return 'assets/images/[name].[ext]';
					}
					if ( /\.css$/.test(name ?? '') ) {
						return `assets/css/[name].[ext]`;
					}
          return 'assets/[name].[ext]';
				}
      }
    }
  }
})
