git submodule foreach git pull

echo # Changelog > CHANGELOG.md
echo ## Plugin >> CHANGELOG.md
echo >> CHANGELOG.md

echo - [Changelog](#changelog) >> CHANGELOG.md
echo 	- [Plugin](#plugin) >> CHANGELOG.md
echo 	- [Schemas](#schemas) >> CHANGELOG.md

git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> CHANGELOG.md

cd minecraft-bedrock-schemas
echo . >> ../CHANGELOG.md
echo >> ../CHANGELOG.md
echo ## Schemas >> ../CHANGELOG.md
echo >> ../CHANGELOG.md
git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..

git add .
git commit -m "auto: Generated Changelog"


vsce package -m "auto: Building New Version" --no-yarn patch