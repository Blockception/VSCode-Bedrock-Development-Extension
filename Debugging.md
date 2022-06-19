# Debugging

to be able to start debugging or building the extensions.

In the terminal type the following lines:

```
npm install -g vsce
npm install
```


## Building

Run the following script to build the extension
```cmd
  npm run compile
```

## Local Running the plugin

In vscode, goto `Run and Debug`
- Make sure the plugin has been built
- Select: `Client + Server (vscode-plugin)`
- And press play

A new windows with only the this plugin should be running, you can select other workspace to test against, but you probally need to restart the session
