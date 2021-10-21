import { expect } from "chai";
import { SafeID, SafeIDNoNamespace } from "../Function";
import {
  create_block,
  create_entity,
  create_item,
  create_manifest,
  create_recipe,
  create_spawn_rule,
  create_volume,
} from "./files";
import { create_animation, create_animation_controller } from "./include";
const { v4: uuid } = require("uuid");

describe("Data", () => {
  describe("Templates", () => {
    describe("Behavior Pack", () => {
      //Test functions
      it("create animation controller", () => IDTest(create_animation_controller));
      it("create animation", () => IDTest(create_animation));
      it("create block", () => IDTest(create_block));
      it("create entity", () => SafeIdNoTest(create_entity));
      it("create item", () => IDTest(create_item));

      it("create manifest", () => IDUUID(create_manifest));
      it("create recipe", () => IDTest(create_recipe));
      it("create spawn rule", () => IDTest(create_spawn_rule));
      it("create volume", () => IDTest(create_volume));
    });
  });
});

const id = "minecraft:foo";
const SafeIdNo = SafeIDNoNamespace(id);
const SafeId = SafeID(id);

function IDTest(fn: (id: string) => string) {
  const out = fn(id);

  expect(out.includes(id), `${fn.name} expected to find ${id} but didnt find it`).to.be.true;
  expect(out.includes("%ID%"), `Did not expect to find %ID%`).to.be.false;
}

function IDUUID(fn: (uuid1: string, uuid2: string) => string) {
  const UUID1 = uuid();
  const UUID2 = uuid();
  const out = fn(UUID1, UUID2);

  expect(out.includes(UUID1), `${fn.name} expected to find ${UUID1} but didnt find it`).to.be.true;
  expect(out.includes(UUID2), `${fn.name} expected to find ${UUID2} but didnt find it`).to.be.true;
  expect(out.includes("%UUID1%"), `Did not expect to find %UUID1%`).to.be.false;
  expect(out.includes("%UUID2%"), `Did not expect to find %UUID2%`).to.be.false;
}

function SafeIdNoTest(fn: (id: string) => string) {
  const out = fn(id);

  expect(out.includes(id), `${fn.name} expected to find ${id} but didnt find it`).to.be.true;
  expect(out.includes(id), `${fn.name} expected to find ${SafeIdNo} but didnt find it`).to.be.true;
  expect(out.includes("%ID%"), `Did not expect to find %ID%`).to.be.false;
  expect(out.includes("%SafeID%"), `Did not expect to find %SafeID%`).to.be.false;
}

function SafeIdTest(fn: (id: string) => string) {
  const out = fn(id);

  expect(out.includes(id), `${fn.name} expected to find ${id} but didnt find it`).to.be.true;
  expect(out.includes(id), `${fn.name} expected to find ${SafeId} but didnt find it`).to.be.true;
  expect(out.includes("%ID%"), `Did not expect to find %ID%`).to.be.false;
  expect(out.includes("%SafeID%"), `Did not expect to find %SafeID%`).to.be.false;
}
