import { expect } from "chai";
import { UniformUrl } from "../../../Code/Url";
import { DataType } from "./Data Type";
import { DetectDataType, DetectGeneralDataType } from "./Detection";
import { GeneralDataType } from "./General Data Type";

describe("Minecraft Format", () => {
  it("DetectDataType", () => {
    testFormat(DetectDataType, DataType.resource_animation_controller, "F:/Temp/Redstone/resource_packs/Example-RP/animation_controllers/sheep.walk.controller.json");
    testFormat(DetectDataType, DataType.resource_animation_controller, "F:/Temp/Redstone/resource_pack/animation_controllers/sheep.walk.controller.json");

    testFormat(DetectDataType, DataType.resource_animation_controller, "F:/Temp/Redstone/behavior_packs/Example-bp/functions/Action.mcfunction");
    testFormat(DetectDataType, DataType.resource_animation_controller, "F:/Temp/Redstone/behavior_pack/functions/Action.mcfunction");

    testFormat(DetectDataType, DataType.resource_animation_controller, "file:///f:/Temp/Redstone/behavior_packs/Example-bp/functions/Action.mcfunction");
    testFormat(DetectDataType, DataType.resource_animation_controller, "file:///f:/Temp/Redstone/behavior_pack/functions/Action.mcfunction");

    testFormat(DetectDataType, DataType.world_manifest, "F:/Temp/Redstone/manifest.json");
  });

  it("DetectGeneralDataType", () => {
    testFormat(DetectGeneralDataType, GeneralDataType.resource_pack, "F:/Temp/Redstone/resource_packs/Example-RP/animation_controllers/sheep.walk.controller.json");
    testFormat(DetectGeneralDataType, GeneralDataType.resource_pack, "F:/Temp/Redstone/resource_pack/animation_controllers/sheep.walk.controller.json");

    testFormat(DetectGeneralDataType, GeneralDataType.behavior_pack, "F:/Temp/Redstone/behavior_packs/Example-bp/functions/Action.mcfunction");
    testFormat(DetectGeneralDataType, GeneralDataType.behavior_pack, "F:/Temp/Redstone/behavior_pack/functions/Action.mcfunction");

    testFormat(DetectGeneralDataType, GeneralDataType.behavior_pack, "file:///f:/Temp/Redstone/behavior_packs/Example-bp/functions/Action.mcfunction");
    testFormat(DetectGeneralDataType, GeneralDataType.behavior_pack, "file:///f:/Temp/Redstone/behavior_pack/functions/Action.mcfunction");

    testFormat(DetectGeneralDataType, GeneralDataType.world, "F:/Temp/Redstone/db/001002.ldb");
  });
});

function testFormat<T>(callbackfn: (uri: string) => T, expected: T, uri: string): void {
  const formatted = UniformUrl(uri);

  const value = callbackfn(uri);
  expect(value).to.equal(expected);
}
