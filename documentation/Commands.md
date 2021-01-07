# Commands

- [Commands](#commands)
	- [Diagnose project](#diagnose-project)
	- [Cheat Sheets](#cheat-sheets)
	- [Create Files](#create-files)

## Diagnose project

`Blockception: Run diagnose on project`

This command causes the plugin to traverse the entire project and look for errors and problems. currently only mcfunctions are processed, but
entities, particles and items are to be included in the future + many more. The diagnoses also uses [validation rules](./validation/Validation.md)

## Cheat Sheets

Cheat sheet are accesable through the following command(s):

| Command                                        | Description                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| `Blockception: Cheat sheet: Molang`            | Displays the cheat sheet for molang, containing filters, queries and more |
| `Blockception: Cheat sheet: Behaviors Filters` | Displays the cheat sheet for filters                                      |

## Create Files

| Command                               | Description                                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Create Entity`                       | Creates new BP and RP definitions files of the given entity, if the files already exist then nothing happens. |
| `Create Entity - Behaviour Pack Only` | Creates new BP definition file of the given entity, if the files already exist then nothing happens.          |
| `Create Entity - Resource Pack Only`  | Creates new RP definition file of the given entity, if the files already exist then nothing happens.          |
