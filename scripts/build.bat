git submodule foreach git pull

echo # Changelog> CHANGELOG.md
echo . >> ../CHANGELOG.md
echo ## Plugin>> CHANGELOG.md

git log -n 20 --regexp-ignore-case --grep="^build(deps-dev):*\|^auto:*\|^updated$\|^added$\|^fixing$\|^fixed$\|^Refactor$\|^\([0-9]*\.[0-9]*\.[0-9]*\)$" --invert-grep --no-merges --pretty=format:"- %%s" >> CHANGELOG.md

cd ../3. BC-Minecraft-Bedrock-Diagnoser
echo . >> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md
echo ## Diagnotics>> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md
git log -n 20 --regexp-ignore-case --grep="^build(deps-dev):*\|^auto:*\|^updated$\|^added$\|^fixing$\|^\([0-9]*\.[0-9]*\.[0-9]*\)$" --invert-grep --no-merges --pretty=format:"- %%s" >> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md

cd ../2. BC-Minecraft-Bedrock-Project
echo . >> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md
echo ## ProjectData>> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md
git log -n 20 --regexp-ignore-case --grep="^build(deps-dev):*\|^auto:*\|^updated$\|^added$\|^fixing$\|^\([0-9]*\.[0-9]*\.[0-9]*\)$" --invert-grep --no-merges --pretty=format:"- %%s" >> ../VSCode-Bedrock-Development-Extension/CHANGELOG.md

cd ../VSCode-Bedrock-Development-Extension/minecraft-bedrock-schemas
echo . >> ../CHANGELOG.md
echo ## Schemas>> ../CHANGELOG.md
git log -n 20 --regexp-ignore-case --grep="^build(deps-dev):*\|^auto:*\|^updated$\|^added$\|^fixing$\|^\([0-9]*\.[0-9]*\.[0-9]*\)$" --invert-grep --no-merges --pretty=format:"- %%s" >> ../CHANGELOG.md

cd ..
git add .
git commit -m "auto: Generated Changelog"