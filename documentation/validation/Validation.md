# Validation

- [Validation](#validation)
	- [Filename](#filename)
	- [Example](#example)

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
