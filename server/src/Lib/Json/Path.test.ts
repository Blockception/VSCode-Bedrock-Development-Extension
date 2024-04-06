import { expect } from 'chai';
import { getJsonPath } from './Path';

interface TestCase {
  element: string;
  expectedPath: string;
}

describe("JsonPath", () => {
  const json = `{
    "format_version": "1.20.41",
    "minecraft:volume": {
      "description": {
        "identifier": "bar:foo"
      },
      "components": {
        "minecraft:bounds": {
          "min": [-50, 0, -50],
          "max": [50, 256, 50]
        },
        "minecraft:fog": {
          "fog_identifier": "minecraft:fog_savanna",
          "priority": 1
        }
      }
    }
  }`;

  const properties: TestCase[] = [
    {
      element: "fog_identifier",
      expectedPath: "minecraft:volume/components/minecraft:fog/fog_identifier"
    },
    {
      element: "min",
      expectedPath: "minecraft:volume/components/minecraft:bounds/min"
    },
    {
      element: "max",
      expectedPath: "minecraft:volume/components/minecraft:bounds/max"
    },
    {
      element: "identifier",
      expectedPath: "minecraft:volume/description/identifier"
    },
    {
      element: "format_version",
      expectedPath: "format_version"
    }
  ];

  properties.forEach(({ element, expectedPath }) => {
    const search = `"${element}":`;
    const index = json.indexOf(search);

    it(`should return the correct path for ${element}`, () => {
      const path = getJsonPath(index, json);
      expect(path).to.equal(expectedPath);
    });

    it(`should return the correct path for ${element}, if the cursor is after it`, () => {
      const path = getJsonPath(index + search.length, json);
      expect(path).to.equal(expectedPath);
    })
  });
});
