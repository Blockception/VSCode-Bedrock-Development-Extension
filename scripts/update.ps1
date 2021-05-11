npm install -g npm-check-updates

npm update
npm audit fix

cd client
npm update
npm audit fix

cd ../server
npm update
npm audit fix

cd ..
git add .
git commit -m "auto: Updated dependecies"