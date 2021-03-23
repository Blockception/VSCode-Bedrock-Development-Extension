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

export type Vec3 = [number, number, number];
export type Vec2 = [number, number];

export interface ModelEntity {
  format_version: string;
  "minecraft:geometry": Model[];
}

export interface Model {
  description: {
    identifier: string;
    texture_width: number;
    texture_height: number;
    visible_bounds_width: number;
    visible_bounds_height: number;
    visible_bounds_offset: [number, number, number];
  };
  bones: Bone[];
}

export interface Bone {
  name?: string;
  parent?: string;
  pivot?: Vec3;
  cubes?: Cube[];
}

export interface Cube {
  origin?: Vec3;
  size?: Vec3;
  pivot?: Vec3;
  rotation?: Vec3;
  uv?: Vec2;
  inflate?: number;
  mirror?: boolean;
}
