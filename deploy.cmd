CHCP 65001

@echo on
cd docs/.vuepress/dist

git init .

git add .

git commit -m 'deploy'

git pull origi master
@REM git pull origin master --allow-unrelated-histories
@REM git remote add origin git@github.com:GavinAlison2/simple-doc.git
git push origin master

cd ../

