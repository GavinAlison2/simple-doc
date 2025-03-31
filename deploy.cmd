@REM #!/usr/bin/env sh

@REM # set -e
CHCP 65001

@REM npm run docs:build

@echo on
cd docs/.vuepress/dist

git init .

git add .

git commit -m 'deploy'

@REM git remote add origin git@github.com:GavinAlison2/GavinAlison2.github.io.git  

@REM git branch -M master

@REM git push -f -u git@github.com:GavinAlison2/GavinAlison2.github.io.git master:main  

git remote add origin git@github.com:GavinAlison2/simple-doc.git
git branch -M master
git push  -u origin master

cd ../

