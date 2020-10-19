echo # Changelog > CHANGELOG.md
git log -n 20 --pretty=format:"- %%s" >> CHANGELOG.md
npm run webpack
pause(5)