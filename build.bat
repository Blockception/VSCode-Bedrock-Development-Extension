echo # Changelog > CHANGELOG.md
git log -n 20 --pretty=format:"- %%s" >> CHANGELOG.md
vsce package >> log.txt
pause(5)