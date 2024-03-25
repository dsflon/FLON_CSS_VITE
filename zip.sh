#!/bin/sh

# package.json があるディレクトリのパス
FLONCSS_PATH="../css_framework"

# package.json からバージョンを取得
VERSION=$(grep '"version"' "$FLONCSS_PATH/package.json" | awk -F '"' '{print $4}')

TARGET=floncss_for_vite_v${VERSION}
PASSWORD="floncss" # パスワードをここで定義

# zip出力先のパス
TARGET_PATH=${FLONCSS_PATH}/public/archives/${VERSION}

# README.mdに記載さているバージョンを更新
sed -i '' "s/Current FlonCSS version: .*/Current FlonCSS version: $VERSION/" README.md

# archivesフォルダが存在しなれば、archivesフォルダを作成する
mkdir -p ${TARGET_PATH}

# 対象ディレクトリまで移動する
cd ${TARGET_PATH}/${TARGET}

# 既存のZIPファイルがあれば削除
rm -f ${TARGET_PATH}/${TARGET}.zip

# 最初に wp ディレクトリを除外して圧縮
zip -P $PASSWORD -r ${TARGET_PATH}/${TARGET}.zip * .dockerignore .editorconfig .prettierrc.js .eslintignore .eslintrc.cjs .gitignore .stylelintignore .stylelintrc.json -x "*dist*" "*node_modules*" "*archives*" ".DS_Store" "zip.sh"
