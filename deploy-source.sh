#!/usr/bin/env sh

# set -e

# npm run docs:build
# npm  run clean
# cd docs/.vuepress/dist
# cat > .gitignore <<EOF
# node_modules
# .DS_Store
# docs/.vuepress/dist
# EOF

git init .

git add -A

git rm -r --cached node_modules
git rm -r --cached docs/.vuepress/dist
git rm -r --cached docs/.vuepress/.cache
git rm -r --cached docs/.vuepress/.temp


git commit -m 'uniapp 组件'

git pull origin master --allow-unrelated-histories
# git remote add origin git@github.com:GavinAlison2/simple-doc.git
git branch -M master
# git push  -f origin master:gh-pages
git push -f origin master

