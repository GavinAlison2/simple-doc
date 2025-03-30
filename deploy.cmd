@REM #!/usr/bin/env sh

@REM # set -e
CHCP 65001

npm run docs:build

cd public

git init .

git add .

git commit -m 'deploy'

git remote add origin git@github.com:GavinAlison2/GavinAlison2.github.io.git  

git branch -M master

git push -f git@github.com:GavinAlison2/GavinAlison2.github.io.git master:main  

cd ../

