#!/usr/bin/env sh

# set -e

# npm run docs:build
# npm  run clean
# cd docs/.vuepress/dist
cat > .gitignore <<EOF
node_modules
.DS_Store
docs/.vuepress/dist
EOF

git init .

git add -A

git rm -r --cached node_modules
git rm -r --cached docs/.vuepress/dist

git commit -m 'deploy-2'

git remote add origin git@github.com:GavinAlison2/simple-doc.git
git branch -M master
# git push  -f origin master:gh-pages
git push -f origin master

