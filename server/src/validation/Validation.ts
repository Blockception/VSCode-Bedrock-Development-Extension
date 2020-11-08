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
export interface ValidationData {
	tags?: ValidationDataStringLists;
	objectives?: ValidationDataStringLists;
}

export interface ValidationDataStringLists {
	valid?: string[] | undefined;
	invalid?: string[] | undefined;
}

export namespace ValidationData {
	export function is(value: any): value is ValidationData {
		if (!value) {
			return false;
		}

		if (value.tags) {
			if (ValidationDataStringLists.is(value.tags)) {
				return true;
			}
		}

		if (value.objectives) {
			if (ValidationDataStringLists.is(value.objectives)) {
				return true;
			}
		}

		return false;
	}

	export function createEmpty(): ValidationData {
		return {
			objectives: ValidationDataStringLists.create(),
			tags: ValidationDataStringLists.create()
		};
	}
}

export namespace ValidationDataStringLists {
	export function is(value: any): value is ValidationDataStringLists {
		if (!value)
			return false;

		if (value.valid) {
			if (Array.isArray(value.valid)) {
				return true;
			}
		}

		if (value.invalid) {
			if (Array.isArray(value.invalid)) {
				return true;
			}
		}

		return false
	}

	export function create(valid: string[] | undefined = undefined, invalid: string[] | undefined = undefined): ValidationDataStringLists {
		return { valid: valid, invalid: invalid };
	}

	export function merge(receiver: ValidationDataStringLists, data: ValidationDataStringLists): void {
		if (data.valid) {
			if (!receiver.valid)
				receiver.valid = [];

			receiver.valid.push(...data.valid);
		}

		if (data.invalid) {
			if (!receiver.invalid)
				receiver.invalid = [];

			receiver.invalid.push(...data.invalid);
		}
	}

	export function isValid(value: string, rules: ValidationDataStringLists): boolean {
		//Check if the value is whitelisted
		if (rules.valid) {
			for (let index = 0; index < rules.valid.length; index++) {
				const element = rules.valid[index];

				if (value !== element) {
					return false;
				}
			}
		}

		//Check if the value is blacklisted
		if (rules.invalid) {
			for (let index = 0; index < rules.invalid.length; index++) {
				const element = rules.invalid[index];

				if (value === element) {
					return false;
				}
			}
		}

		return true;
	}
}