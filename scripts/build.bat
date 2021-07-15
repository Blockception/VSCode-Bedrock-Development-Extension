git submodule foreach git pull

echo # Changelog> CHANGELOG.md
echo . >> ../CHANGELOG.md
echo ## Plugin>> CHANGELOG.md

git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> CHANGELOG.md

cd minecraft-bedrock-schemas
echo . >> ../CHANGELOG.md
echo ## Schemas>> ../CHANGELOG.md
git log -n 40 --grep=auto:* --invert-grep --no-merges --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..

git add .
git commit -m "auto: Generated Changelog"

call npm version patch

git add .
git commit -m "auto: Building New Version"

call npm install -g vsce
npx vsce package 
