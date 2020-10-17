# Workspace querying

After the plugin has gone through the workspace(s), It is possible to query through the symbols generated for that data.

Any query written will be matched against the items identifier. For example minecraft: should return minecrafts data. Certain keywords will trigger to display a type of symbol in the workspace:

|Keyword	|Displays	|
|---------|---------|
|- block<br/>- blocks<br/>|Returns a list of Blocks|
|- effect<br/>- effects<br/>|Returns a list of Effects|
|- entity<br/>- entities<br/>|Returns a list of Entities|
|- fake<br/>- fake entity<br/>- fake entities<br/>|Returns a list of FakeEntities|
|- function<br/>- functions<br/>|Returns a list of Functions|
|- item<br/>- items<br/>|Returns a list of Items|
|- objective<br/>- objectives<br/>- score<br/>- scores<br/>|Returns a list of Objectives|
|- sound<br/>- sounds<br/>|Returns a list of Sounds|
|- tag<br/>- tags<br/>|Returns a list of Tag|
|- ticking<br/>- tickingarea<br/>- tickingareas<br/>|Returns a list of TickingAreas|