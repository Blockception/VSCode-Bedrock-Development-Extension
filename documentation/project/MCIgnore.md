# MCIgnore

Based upon `.gitignore`. This file specifies through glob-patterns what files, folder to excluded from the project

**Example**

```ini
## This is a comment
## this will ignore the folders/file called Template
Template

## This will included file/folders that are in a folder called template and have the name and extension: settings.json
!Template/settings.json

## Ignore any file in any folder with the template.json spec
**/*.template.json
```
