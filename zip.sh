#!/bin/sh

# 変数宣言
BASE=archives
TARGET=floncss_for_wordpress
PASSWORD="floncss" # パスワードをここで定義

BASE_PATH=./${BASE}

# archivesフォルダが存在しなれば、archivesフォルダを作成する
mkdir -p ${BASE_PATH}

# 対象ディレクトリまで移動する
cd ${BASE_PATH}/${TARGET}

# 既存のZIPファイルがあれば削除
rm -f ${BASE_PATH}/${TARGET}.zip

# 最初に wp ディレクトリを除外して圧縮
zip -P $PASSWORD -r ${BASE_PATH}/${TARGET}.zip * .dockerignore .editorconfig .env.example .eslintignore .eslintrc.js .gitignore .htaccess .stylelintignore .stylelintrc.js -x "*wp*" "*node_modules*" "*archives*" ".DS_Store" "zip.sh"

# 次に wp/wp-content/themes ディレクトリを追加
zip -P $PASSWORD -r ${BASE_PATH}/${TARGET}.zip "wp/wp-content/themes/THEME_NAME"
