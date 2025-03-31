#!/usr/bin/env sh

# set -e

# npm run docs:build

# cd docs/.vuepress/dist

git init .

git add -A

git commit -m 'deploy'

git remote add origin git@github.com:GavinAlison2/simple-doc.git
git branch -M master
# git push  -f origin master:gh-pages
git push -f origin master

