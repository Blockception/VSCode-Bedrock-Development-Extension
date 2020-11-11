# Validation

- [Validation](#validation)
  - [General](#general)
  - [Filename](#filename)
  - [Example](#example)

## General

The plugins tries to find definitions of objects through the project. But it might be for example already defined in the world and thus no need to
have objectives created. Its also possible to apply blacklisted items. Especially in multi user development, the abillity to have wrong data marked is
a usefull tool.

Atm 2 types can be specified; tags and objectives. The files can be created anywhere and will be merged, just the filename needs to be correct

## Filename

The filename of the rules needs to be: `minecraft-validation.json`. You can have as many as you want. they will get merged during processing. neither
does the location matter as long as it is in your workspace

## Example

```json
{
  "tags": {
    "valid": ["Initialize"],
    "invalid": ["Init"]
  },
  "objectives": {
    "valid": ["timer", "score", "check"],
    "invalid": ["jumpingCheck"]
  }
}
```
