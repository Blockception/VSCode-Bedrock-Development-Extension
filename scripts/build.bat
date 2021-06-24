git submodule foreach git pull

echo # Changelog> CHANGELOG.md
echo ## Plugin>> CHANGELOG.md
echo \t>> CHANGELOG.md

echo - [Changelog](#changelog)>> CHANGELOG.md
echo \t- [Plugin](#plugin)>> CHANGELOG.md
echo \t- [Schemas](#schemas)>> CHANGELOG.md

git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> CHANGELOG.md

cd minecraft-bedrock-schemas
echo \t>> ../CHANGELOG.md
echo ## Schemas>> ../CHANGELOG.md
echo \t>> ../CHANGELOG.md
git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..

git add .
git commit -m "auto: Generated Changelog"


vsce package -m "auto: Building New Version" --no-yarn patch