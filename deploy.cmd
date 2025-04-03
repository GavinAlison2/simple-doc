CHCP 65001

@echo on
cd docs/.vuepress/dist

git init .

git add .

git commit -m 'deploy'

git remote add origin git@github.com:GavinAlison2/simple-doc.git
git branch -M master
git push  -u origin master

cd ../

