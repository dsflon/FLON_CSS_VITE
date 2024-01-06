#!/bin/sh

# 変数宣言
BASE=archives
TARGET=floncss_for_vite_v1.0.0
PASSWORD="floncss" # パスワードをここで定義

BASE_PATH=./${BASE}

# archivesフォルダが存在しなれば、archivesフォルダを作成する
mkdir -p ${BASE_PATH}

# 対象ディレクトリまで移動する
cd ${BASE_PATH}/${TARGET}

# 既存のZIPファイルがあれば削除
rm -f ${BASE_PATH}/${TARGET}.zip

# 最初に wp ディレクトリを除外して圧縮
zip -P $PASSWORD -r ${BASE_PATH}/${TARGET}.zip * .dockerignore .editorconfig .eslintignore .eslintrc.cjs .gitignore .stylelintignore .stylelintrc.cjs -x "*dist*" "*node_modules*" "*archives*" ".DS_Store" "zip.sh"
