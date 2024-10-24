import { resolve } from 'path';

/**
 * css, js で利用する alias
 */
export function aliasConfig({SRC_PATH, PUBLIC_PATH}) {
  return {
    // css 内で他の css を import する際に利用
    '@floncss': resolve(__dirname, `${SRC_PATH}/assets/floncss`),

    // css 内での画像パスを指定する際に利用
    '@images': resolve(__dirname, `${PUBLIC_PATH}/assets/images`),
  };
}

/**
 * html で利用する alias
 */
export function htmlAliasConfig({ BASE_DIR }) {
  const base = BASE_DIR ? `/${BASE_DIR}` : '';

  return {
    /**
     * href にルート相対バスを指定する際に接頭辞として使う
     * BASE_DIR 指定の有無にかかわらず原則として常に利用する
     *
     * @example html
     *  <a href="{{uri}}/test/">リンク</a>
    */
    uri: base,

    /**
     * css, js を読み込む際に接頭辞として使う
     *
     * @example html
     *  <link rel="stylesheet" href="{{assets}}/floncss/global.css">
    */
    assets: `/assets`,

    /**
     * rel="icon" など npm run build 時に base パスが補完されない
     * そのため、npm run build と dev での base パスを切り替える必要あり
     *
     * @example html
     *  <link rel="icon" href="{{assets}}/images/favicon.ico" />
    */
    meta_assets: () => {
      // npm run build 時
      if(process.env.NODE_ENV === 'production') {
        return `${base}/assets`;
      }

      return `/assets`;
    },

    /**
     * 要件でhrefに絶対パスを求められる場合はこちらの orign を使う
     * @example html
     *  <a href="{{origin}}/test/">リンク</a>
     *
     *  npm run build:stg でビルドした場合、下記にように出力される
     *  <a href="http://sample.staging.com/test/">リンク</a>
    */
    // origin: () => {
    //   if(process.env.ENV === 'local') {
    //     return `http://localhost:8000${base}`;
    //   }

    //   if(process.env.ENV === 'staging') {
    //     return `http://sample.staging.com${base}`;
    //   }

    //   if(process.env.ENV === 'production') {
    //     return `http://sample.production.com${base}`;
    //   }

    //   return `http://localhost:${PORT}${base}`;
    // },
  }
}
