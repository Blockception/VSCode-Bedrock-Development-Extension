import { Database } from "../Database/include";
import { Manager } from "../Manager/Manager";
import { Block } from "../Types/General/Block/Block";
import { Effect } from "../Types/General/Effect/Effect";
import { EmptyTypes } from "../Types/General/Empty";
import { Entity } from "../Types/General/Entity/Entity";
import { Item } from "../Types/General/Item/Item";
import { Sound } from "../Types/General/Sound/Sound";

import * as edu from "./edu.json";
import * as vanilla from "./vanilla.json";

export function AddMinecraftData() {
  let Data = Database.Data;

  //Import data from the json file
  vanilla.blocks.forEach((block) => Data.General.Blocks.Update(AddBlock(block)));
  vanilla.entities.forEach((entity) => Data.General.Entities.Update(AddEntity(entity)));
  vanilla.items.forEach((item) => Data.General.Items.Update(AddItem(item)));
  vanilla.sounds.forEach((sound) => Data.General.Sounds.Update(AddSound(sound)));
  vanilla.effects.forEach((effect) => Data.General.Effects.Update(AddEffect(effect)));

  //TODO redo
  if (Manager.Settings.Education.Enable) {
    edu.blocks.forEach((block) => Data.General.Blocks.Update(AddEduBlock(block)));
    edu.entities.forEach((entity) => Data.General.Entities.Update(AddEduEntity(entity)));
    edu.items.forEach((item) => Data.General.Items.Update(AddEduItem(item)));
    edu.sounds.forEach((sound) => Data.General.Sounds.Update(AddEduSound(sound)));
  }
}

function AddBlock(data: string): Block {
  let B = new Block();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "minecraft vanilla block: " + data,
  };

  return B;
}

function AddEntity(data: string): Entity {
  let B = new Entity();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "minecraft vanilla entity: " + data,
  };
  B.Events = ["minecraft:entity_spawned"];

  return B;
}

function AddEffect(data: string): Effect {
  let E = new Effect();
  E.Identifier = data;
  E.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  E.Documentation = {
    kind: "markdown",
    value: "minecraft vanilla effect: " + data,
  };

  return E;
}

function AddItem(data: string): Item {
  let B = new Item();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "minecraft vanilla entity: " + data,
  };
  B.Events = [];

  return B;
}

function AddSound(data: string): Sound {
  let S = new Sound();
  S.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  S.Identifier = data;

  return S;
}

function AddEduBlock(data: string): Block {
  let B = new Block();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "**[EDU]** minecraft eduaction block: " + data,
  };

  return B;
}

function AddEduEntity(data: string): Entity {
  let B = new Entity();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "**[EDU]** minecraft eduaction entity: " + data,
  };
  B.Events = ["minecraft:entity_spawned"];

  return B;
}

function AddEduItem(data: string): Item {
  let B = new Item();
  B.Identifier = data;
  B.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  B.Documentation = {
    kind: "markdown",
    value: "**[EDU]** minecraft education entity: " + data,
  };
  B.Events = [];

  return B;
}

function AddEduSound(data: string): Sound {
  let S = new Sound();
  S.Location = {
    range: EmptyTypes.EmptyRange(),
    uri: "https://minecraft.gamepedia.com/Add-on",
  };
  S.Identifier = data;

  return S;
}
