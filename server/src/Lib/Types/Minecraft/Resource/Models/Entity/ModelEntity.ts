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
