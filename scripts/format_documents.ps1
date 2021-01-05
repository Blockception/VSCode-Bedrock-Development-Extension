git add .
git commit

npx prettier --write "**/*.json" --config ./scripts/json.prettierrc.json
git submodule foreach git add **/*.json
git submodule foreach git commit -m "auto: Formatted json files"
git add **/*.json
git commit -m "auto: Formatted json files"

npx prettier --write "**/*.ts" --config ./scripts/typescript.prettierrc.json
git submodule foreach git add **/*.ts
git submodule foreach git commit -m "auto: Formatted typescript files"
git add **/*.ts
git commit -m "auto: Formatted typescript files"