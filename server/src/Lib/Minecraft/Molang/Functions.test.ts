import { expect } from 'chai';
import { IsMolang } from './Functions';

describe("Molang", () => {
  describe("IsMolang", () => {
    const shouldbe = [
      "variable.is_holding_right = 0.0;",
      "variable.is_blinking = 0.0;",
      "variable.last_blink_time = 0.0;",
      "variable.hand_bob = 0.0;",
      "variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);"
    ];

		shouldbe.forEach(item=>it(item, ()=>{
			expect(IsMolang(item)).to.be.true;
		}));
  });
});
