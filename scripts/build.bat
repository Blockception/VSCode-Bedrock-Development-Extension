git submodule foreach git pull
echo # Changelog > CHANGELOG.md
echo ## Plugin >> CHANGELOG.md
git log -n 20 --pretty=format:"- %%s" >> CHANGELOG.md

cd minecraft-bedrock-schemas
echo . >> ../CHANGELOG.md
echo ## Schemas >> ../CHANGELOG.md
git log -n 20 --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..

vsce package
pause(5)