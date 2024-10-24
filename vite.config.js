import { resolve } from 'path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';
import handlebars from 'vite-plugin-handlebars';
import fs from 'fs-extra';

import { aliasConfig, htmlAliasConfig } from './alias.config';

/**
 * ベースディレクトリ名
 * 例えば const BASE_DIR = 'abc'; とした場合は、http://localhost:3000/abc/ として表示される
 */
const BASE_DIR = '';

/**
 * 静的ファイルのディレクトリ
 */
const PUBLIC_PATH = resolve(__dirname, 'public');

/**
 * ビルド時の出力先のディレクトリ
 */
const DIST_PATH = resolve(__dirname, 'dist');

/**
 * ソースファイルのディレクトリ
 */
const SRC_PATH = resolve(__dirname, 'src');

/**
 * コンポーネントディレクトリ名
 */
const COMPONENT_DIR = 'components';

const HTML_ENTRIES = resolve(SRC_PATH, '**/*.html');
const CSS_ENTRIES = resolve(SRC_PATH, 'assets/floncss/*.css');
const JS_ENTRIES = resolve(SRC_PATH, 'assets/js/*.js');

const PORT = 3000;

export default defineConfig({
	server: {
    port: PORT,
		host: true, // IPアドレスを有効化
    base: './dist'
	},

  root: SRC_PATH,

  base: BASE_DIR || undefined,

  // 静的ファイルの場所（デフォルトでpublic）
  publicDir: PUBLIC_PATH,

  resolve: {
    alias: aliasConfig({
      SRC_PATH,
      PUBLIC_PATH
    }),
  },

  css: {
    devSourcemap: true
  },

  plugins: [
    // components 用ディレクトリを指定
    handlebars({
      partialDirectory: resolve(SRC_PATH, COMPONENT_DIR),

      context(pagePath) {
        const pageData = {
          '/index.html': { isHome: true },
        };

        return {
          ...pageData[pagePath],

          /** html で利用する alias を以下に記述 */
          ...htmlAliasConfig({
            BASE_DIR
          }),
        }
      },
    }),

    // build 時は components 用ディレクトリは不要なので削除
    {
      name: 'remove-ignored-dir',
      writeBundle() {
        fs.removeSync(resolve(DIST_PATH, BASE_DIR, COMPONENT_DIR));
      }
    },
  ],

  build: {
    outDir: resolve(DIST_PATH, BASE_DIR),
		emptyOutDir: true,
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
					if ( /\.(gif|jpeg|jpg|png|svg|webp|ico|)$/.test(name ?? '') ) {
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
