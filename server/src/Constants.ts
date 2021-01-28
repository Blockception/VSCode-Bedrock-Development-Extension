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
export namespace Languages {
  export const McFunctionIdentifier: string = "bc-minecraft-mcfunction";
  export const McOtherIdentifier: string = "bc-minecraft-Other";
  export const McLanguageIdentifier: string = "bc-minecraft-language";
  export const JsonIdentifier: string = "json";
  export const JsonCIdentifier: string = "jsonc";
}

export namespace Identification {
  export const SettingsConfigurationIdentifier: string = "BC-MC";
}

export namespace Commands {
  export const ImportErrors: string = "bc.minecraft.errors.import";
  export const DiagnoseProject: string = "bc.minecraft.diagnose.project";

  export namespace CheatSheet {
    export const Molang: string = "bc-cheat-sheet-molang";
    export const BehaviorFilters: string = "bc-cheat-sheet-behavior-filters";
  }

  /**The namespace that stores all creation commands */
  export namespace Create {
    export const Base = "bc-create-";

    /**The namespace that stores all general creation commands */
    export namespace General {
      /**The command to create entities files */
      export const Entity: string = Base + "entity";
      /**The command to create language files */
      export const Languages: string = Base + "language-all";
      /**The command to create all manifests */
      export const Manifests: string = Base + "manifest-all";
    }

    /**The namespace that stores all Behavior pack creation commands */
    export namespace Behaviorpack {
      const BPBase = Base + "behavior_pack-";

      /**The command to create animation controllers files */
      export const Animation_Controller: string = BPBase + "animation_controllers";
      /**The command to create animations files */
      export const Animation: string = BPBase + "animations";
      /**The command to create block file */
      export const Block: string = BPBase + "block";
      /**The command to create entities files */
      export const Entity: string = BPBase + "entity";
      /**The command to create item files */
      export const Item: string = BPBase + "item";
      /**The command to create language files */
      export const Languages: string = BPBase + "language";
      /**The command to create loot_table files */
      export const Loot_Table: string = BPBase + "loot_table";
      /**The command to create all manifests*/
      export const Manifests: string = BPBase + "manifest";
      /**The command to create recipe files */
      export const Recipe: string = BPBase + "recipe";
      /**The command to create spawn_rule files */
      export const Spawn_Rule: string = BPBase + "spawn_rule";
      /**The command to create trading files */
      export const Trading: string = BPBase + "trading";
    }

    /**The namespace that stores all resourcepack creation commands */
    export namespace Resourcepack {
      const RPBase = Base + "resource_pack-";

      /**The command to create animation controllers files */
      export const Animation_Controller: string = RPBase + "animation_controllers";
      /**The command to create animations files */
      export const Animation: string = RPBase + "animations";
      /**The command to create animations files */
      export const Attachable: string = RPBase + "attachable";
      /**The command to create animations files */
      export const Biomes_Client: string = RPBase + "biomes_client";
      /**The command to create animations files */
      export const Blocks: string = RPBase + "blocks";
      /**The command to create entities files */
      export const Entity: string = RPBase + "entity";
      /**The command to create flipbook_textures files */
      export const Flipbook_Textures: string = RPBase + "flipbook_textures";
      /**The command to create fog files */
      export const Fog: string = RPBase + "fog";
      /**The command to create language files */
      export const Languages: string = RPBase + "language";
      /**The command to create item texture file */
      export const Item_Texture: string = RPBase + "item_texture";
      /**The command to create all manifests*/
      export const Manifests: string = RPBase + "manifest";
      /**The command to create model file */
      export const Model: string = RPBase + "model";
      /**The command to create the music definitions file */
      export const Music_Definitions: string = RPBase + "music_definitions";
      /**The command to create the particle file */
      export const Particle: string = RPBase + "particle";
      /**The command to create the particle file */
      export const Render_Controller: string = RPBase + "render_controller";
      /**The command to create the sounds file */
      export const Sounds: string = RPBase + "sounds";
      /**The command to create the sound definitions file */
      export const Sound_Definitions: string = RPBase + "sound_definitions";
      /**The command to create the terrain texture file */
      export const Terrain_Texture: string = RPBase + "terrain_texture";
      /**The command to create the terrain texture list file */
      export const Texture_List: string = RPBase + "texture_list";
    }

    /**The namespace that stores all World creation commands */
    export namespace World {
      const WPBase = Base + "world-";

      /**The command to create language files */
      export const Languages: string = WPBase + "language";
      /**The command to create all manifests*/
      export const Manifests: string = WPBase + "manifest";
    }
  }
}
