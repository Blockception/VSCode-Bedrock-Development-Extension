//max 32
export const ToolIdentification = "blockception-minecraft-bedrock";

/** */
export namespace Languages {
  /** */
  export const McFunctionIdentifier: string = "bc-mcfunction";
  /** */
  export const McOtherIdentifier: string = "bc-minecraft-other";
  /** */
  export const McLanguageIdentifier: string = "bc-minecraft-language";
  /** */
  export const McProjectIdentifier: string = "bc-minecraft-project";
  /** */
  export const McMolangIdentifier: string = "bc-minecraft-molang";
  /** */
  export const JsonIdentifier: string = "json";
  /** */
  export const JsonCIdentifier: string = "jsonc";
}

/** */
export namespace Identification {
  /** */
  export const SettingsConfigurationIdentifier: string = "BC-MC";
}

/** */
export namespace Commands {
  /** */
  export const DiagnoseProject: string = "bc.minecraft.diagnose.project";
  /** */
  export const AddLanguageFile: string = "bc.minecraft.language.add";
  /** */
  export const ScanProjects: string = "bc.minecraft.project.scan";

  /** */
  export const StoreProject: string = "bc.minecraft.project.store";

  /** */
  export const ShowVanillaFile: string = "bc.minecraft.vanilla.show";

  /** */
  export const ShowDocs: string = "bc.minecraft.docs.show";

  /** */
  export namespace Files {
    export const Append = "bc-files-append";
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

    /**
     *
     */
    export namespace Project {
      const PPBase = Base + "project-";

      /**The command to create world project */
      export const WorldProject: string = PPBase + "world";
      /**The command to create resource pack */
      export const Resourcepack: string = PPBase + "resource-pack";
      /**The command to create behavior pack */
      export const Behaviorpack: string = PPBase + "behavior-pack";
    }

    /**The namespace that stores all Behavior pack creation commands */
    export namespace Behaviorpack {
      const BPBase = Base + "behavior-";

      /**The command to create animation controllers files */
      export const Animation_Controller: string = BPBase + "animation_controllers";
      /**The command to create animations files */
      export const Animation: string = BPBase + "animations";
      /**The command to create block file */
      export const Block: string = BPBase + "block";
      /**The command to create entities files */
      export const Entity: string = BPBase + "entity";
      /**The command to create entities files */
      export const Dialogue: string = BPBase + "dialogue";
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
      /**The command to create volume files */
      export const Volume: string = BPBase + "volume";
    }

    /**The namespace that stores all resourcepack creation commands */
    export namespace Resourcepack {
      const RPBase = Base + "resource-";

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

  /** */
  export namespace MCProject {
    /** */
    export const Create: string = "bc.mcproject.create";
  }

  /** */
  export namespace Errors {
    /** */
    export const OpenLastest = "bc.errors.open_lastest";
  }
}
