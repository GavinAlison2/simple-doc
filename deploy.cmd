CHCP 65001

@echo on
cd docs/.vuepress/dist

git init .

git add .

git commit -m 'deploy'

git pull origin master --allow-unrelated-histories
git remote add origin git@github.com:GavinAlison2/simple-doc.git
git push origin master

cd ../

