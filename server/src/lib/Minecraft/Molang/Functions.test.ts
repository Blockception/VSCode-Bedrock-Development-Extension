import { expect } from "chai";
import { IsMolang } from "./Functions";

describe("Molang", () => {
  describe("IsMolang", () => {
    const shouldBe = [
      "variable.is_holding_right = 0.0;",
      "variable.is_blinking = 0.0;",
      "variable.last_blink_time = 0.0;",
      "variable.hand_bob = 0.0;",
      "variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);",
      "variable.tcos1 = -variable.tcos0;",
      "query.last_hit_by_player ? Math.Random(1,3) : 0",
      "Math.Random(1,7)",
    ];

    shouldBe.forEach((item) =>
      it(item, () => {
        expect(IsMolang(item)).to.be.true;
      })
    );

    const shouldNotBe = ["Some texts should this not be detected"];

    shouldNotBe.forEach((item) =>
      it(item, () => {
        expect(IsMolang(item)).to.be.false;
      })
    );
  });
});
