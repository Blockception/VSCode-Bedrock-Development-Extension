git add .
git commit
npx prettier --write "**/*.json" --config ./scripts/json.prettierrc.json
git add **/*.json
git commit -m "auto: Formatted json files"
npx prettier --write "**/*.ts" --config ./scripts/typescript.prettierrc.json
git add **/*.ts
git commit -m "auto: Formatted typescript files"