import { FormatVersion } from "../../Interfaces/FormatVersion";

export interface Particle extends FormatVersion {
  particle_effect: {
    description: {
      identifier: string;
    };
    components: object;
  };
}

export namespace Particle {
  export function is(value: any | undefined): value is Particle {
    if (value) {
      if (value.format_version && value.particle_effect && value.particle_effect.description && value.particle_effect.description.identifier && value.particle_effect.components) {
        return true;
      }
    }

    return false;
  }
}
