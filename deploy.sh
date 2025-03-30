#!/usr/bin/env sh

# set -e

npm run build

cd public

git init

git add .

git commit -m 'deploy'

git remote add origin git@github.com:GavinAlison2/GavinAlison2.github.io.git # 关联远程仓库

git branch -M master

git push -f git@github.com:GavinAlison2/GavinAlison2.github.io.git master:main # 推送到github

cd -

