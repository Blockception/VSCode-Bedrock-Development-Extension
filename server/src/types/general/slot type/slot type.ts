/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
	 list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
	 this list of conditions and the following disclaimer in the documentation
	 and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
	 contributors may be used to endorse or promote products derived from
	 this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Mode, ModeCollection } from '../../commands/modes/include';

export interface SlotTypeModeCollection extends ModeCollection {
	Modes: SlotTypeMode[];
}

export interface SlotTypeMode extends Mode {
	range?: { min: number, max: number }
}

export namespace SlotTypeMode {
	export function is(value : any) : value is SlotTypeMode {
		if (value && value.Name && value.Description) {
			return true;
		}

		return false;
	}
}

export const SlotTypeModes: SlotTypeModeCollection = {
	Name: "slot type",
	Modes: [
		{ Name: 'slot.armor.chest', Description: '' },
		{ Name: 'slot.armor.feet', Description: '' },
		{ Name: 'slot.armor.head', Description: '' },
		{ Name: 'slot.armor.legs', Description: '' },
		{ Name: 'slot.chest', Description: '', range: { min: 0, max: 14 } },
		{ Name: 'slot.container', Description: '', range: { min: 0, max: 53 } },
		{ Name: 'slot.enderchest', Description: '', range: { min: 0, max: 26 } },
		{ Name: 'slot.hotbar', Description: '', range: { min: 0, max: 8 } },
		{ Name: 'slot.inventory', Description: '', range: { min: 0, max: 26 } },
		{ Name: 'slot.saddle', Description: '' },
		{ Name: 'slot.weapon.mainhand', Description: '' },
		{ Name: 'slot.weapon.offhand', Description: '' }
	]
}