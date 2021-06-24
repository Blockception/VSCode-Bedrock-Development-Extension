git submodule foreach git pull

echo # Changelog> CHANGELOG.md
echo . >> ../CHANGELOG.md
echo ## Plugin>> CHANGELOG.md

git log -n 40 --grep='auto:*' --invert-grep --no-merges --pretty=format:"- %%s" >> CHANGELOG.md

cd minecraft-bedrock-schemas
echo . >> ../CHANGELOG.md
echo ## Schemas>> ../CHANGELOG.md
git log -n 40 --grep='auto:*' --invert-grep --no-merges --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..

npx prettier --write "./CHANGELOG.md" --config ./scripts/markdown.prettierrc.json

git add .
git commit -m "auto: Generated Changelog"


vsce package -m "auto: Building New Version" --no-yarn patch