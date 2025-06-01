import {
  commands,
  ExtensionContext,
  FileType,
  ProgressLocation,
  QuickPickItem,
  Uri,
  window,
  workspace,
} from "vscode";
import { Commands } from "@blockception/shared";
import { GithubFiles } from "bc-minecraft-bedrock-vanilla-data/lib/src/Lib/Vanilla/sources";
import path from "path";

export function activate(context: ExtensionContext): void {
  async function FillIdByName() {
    const base = context.storageUri || context.globalStorageUri;
    const storage_path = path.join(base.fsPath, "vanilla");
    const command = new FillIdByNameCommand(storage_path);

    return command.process("resource_pack/texts/en_US.lang", GithubFiles.source);
  }

  context.subscriptions.push(commands.registerCommand(Commands.FillIdByName, FillIdByName));
}

const day_diff_2 = 1000 * 60 * 60 * 24 * 2;

class FillIdByNameCommand {
  private storage: string;

  constructor(storage: string) {
    this.storage = storage;
  }

  getFilepath(key: string): string {
    return path.join(this.storage, key);
  }

  async canRead(filepath: string): Promise<boolean> {
    try {
      const stat = await workspace.fs.stat(Uri.file(filepath));

      if (stat.type !== FileType.File) return false;

      //Check if the file is not older then 2 days
      const now = new Date();
      const file = new Date(stat.mtime);

      const diff = now.getTime() - file.getTime();

      return diff <= day_diff_2;
    } catch (err) {
      console.log("trouble during checking of file", err);
      return false;
    }
  }

  async download(uri: string, filepath: string): Promise<void> {
    const progressOptions = {
      location: ProgressLocation.Notification,
      title: "Downloading vanilla file",
      cancellable: false,
    };

    return window.withProgress(progressOptions, async (progress) => {
      const options: RequestInit = {
        method: "GET",
        redirect: "error",
      };

      progress.report({
        message: "Downloading vanilla file",
        increment: 0,
      });

      await fetch(uri, options)
        .then((data) => data.text())
        .then((text) => {
          return workspace.fs.writeFile(Uri.file(filepath), Buffer.from(text, "utf8"));
        })
        .catch((err) => {
          window.showErrorMessage(
            "Failed to download vanilla file\n",
            uri + "\n",
            filepath + "\n",
            JSON.stringify(err)
          );
        })
        .finally(() => {
          console.log("Downloaded vanilla file", filepath);
        });

      progress.report({ increment: 100 });
    });
  }

  async process(key: string, source: string): Promise<void> {
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }

    const filepath = this.getFilepath(key);
    const uri = source + key;

    const dir = path.dirname(filepath);

    await workspace.fs.createDirectory(Uri.file(dir));

    // Check if already exists and download if not
    const canRead = await this.canRead(filepath);
    if (!canRead) {
      await this.download(uri, filepath);
    }

    // Load contents
    let contents: string;
    try {
      contents = new TextDecoder("utf-8").decode(await workspace.fs.readFile(Uri.file(filepath)));
    } catch (err) {
      window.showErrorMessage("Failed to read vanilla file", filepath, JSON.stringify(err));
      return;
    }

    // Parse contents
    const lines = contents
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => {
        return line.length > 0 && !line.startsWith("#") && (line.startsWith("item.") || line.startsWith("tile."));
      });
    const items = new Map<string, string>();

    for (const line of lines) {
      const parts = line.split("=", 2);
      const id = parts[0];
      const name = parts[1].split("#")[0].trim();

      items.set(name, id);
    }

    const keys = Array.from(items.keys());

    const prefill = editor.document.getText(editor.selection);

    await this.quickPickWithPrefill(keys, prefill).then((picked) => {
      if (!picked) {
        return;
      }

      const localizationId = items.get(picked);
      if (!localizationId) {
        return;
      }

      const id = getIdByLocalizationID(localizationId);
      if (!id) {
        return;
      }

      editor.edit((editBuilder) => {
        const selection = editor.selection;
        if (selection.isEmpty) {
          // No selection: insert at cursor position
          editBuilder.insert(selection.start, id);
        } else {
          // Replace the selected text
          editBuilder.replace(selection, id);
        }
      });
    });
  }
  quickPickWithPrefill(items: string[], prefill: string): Promise<string | undefined> {
    const qp = window.createQuickPick<QuickPickItem>();
    qp.items = items.map((label) => ({ label }));
    qp.value = prefill;
    qp.placeholder = "Start typing or pick an item...";

    return new Promise((resolve) => {
      qp.onDidAccept(() => {
        const picked = qp.selectedItems.length > 0 ? qp.selectedItems[0].label : undefined;
        qp.hide();
        resolve(picked);
      });

      qp.onDidHide(() => qp.dispose());
      qp.show();
    });
  }
}

//TODO: This should definitely be in a different place, but not sure where
export const LocalizationIDs: { [key: string]: string } = {
  acacia_boat: "item.boat.acacia.name",
  acacia_chest_boat: "item.chest_boat.acacia.name",
  acacia_door: "item.acacia_door.name",
  acacia_fence: "tile.acaciaFence.name",
  acacia_hanging_sign: "item.acacia_hanging_sign.name",
  acacia_leaves: "tile.leaves2.acacia.name",
  acacia_log: "tile.log.acacia.name",
  acacia_planks: "tile.planks.acacia.name",
  acacia_sapling: "tile.sapling.acacia.name",
  acacia_sign: "tile.acacia_standing_sign.name",
  acacia_slab: "tile.wooden_slab.acacia.name",
  acacia_wood: "tile.wood.acacia.name",
  allay_spawn_egg: "item.spawn_egg.entity.allay.name",
  allium: "tile.red_flower.allium.name",
  andesite: "tile.stone.andesite.name",
  andesite_slab: "tile.stone_slab3.andesite.name",
  andesite_wall: "tile.cobblestone_wall.andesite.name",
  armadillo_spawn_egg: "item.spawn_egg.entity.armadillo.name",
  axolotl_bucket: "item.bucketAxolotl.name",
  axolotl_spawn_egg: "item.spawn_egg.entity.axolotl.name",
  azure_bluet: "tile.red_flower.houstonia.name",
  bamboo_chest_raft: "item.chest_boat.bamboo.name",
  bamboo_door: "item.bamboo_door.name",
  bamboo_hanging_sign: "item.bamboo_hanging_sign.name",
  bamboo_raft: "item.boat.bamboo.name",
  bamboo_sign: "item.bamboo_sign.name",
  banner: "tile.standing_banner.black.name",
  bat_spawn_egg: "item.spawn_egg.entity.bat.name",
  bed: "item.bed.white.name",
  bee_spawn_egg: "item.spawn_egg.entity.bee.name",
  birch_boat: "item.boat.birch.name",
  birch_chest_boat: "item.chest_boat.birch.name",
  birch_door: "item.birch_door.name",
  birch_fence: "tile.birchFence.name",
  birch_hanging_sign: "item.birch_hanging_sign.name",
  birch_leaves: "tile.leaves.birch.name",
  birch_log: "tile.log.birch.name",
  birch_planks: "tile.planks.birch.name",
  birch_sapling: "tile.sapling.birch.name",
  birch_sign: "tile.birch_standing_sign.name",
  birch_slab: "tile.wooden_slab.birch.name",
  birch_wood: "tile.wood.birch.name",
  black_bundle: "item.black_bundle",
  black_carpet: "tile.carpet.black.name",
  black_concrete: "tile.concrete.black.name",
  black_concrete_powder: "tile.concretePowder.black.name",
  black_dye: "item.dye.black_new.name",
  black_glazed_terracotta: "tile.glazedTerracottaBlack.name",
  black_shulker_box: "tile.shulkerBoxBlack.name",
  black_stained_glass: "tile.stained_glass.black.name",
  black_stained_glass_pane: "tile.stained_glass_pane.black.name",
  black_terracotta: "tile.stained_hardened_clay.black.name",
  black_wool: "tile.wool.black.name",
  blaze_spawn_egg: "item.spawn_egg.entity.blaze.name",
  blue_bundle: "item.blue_bundle",
  blue_carpet: "tile.carpet.blue.name",
  blue_concrete: "tile.concrete.blue.name",
  blue_concrete_powder: "tile.concretePowder.blue.name",
  blue_dye: "item.dye.blue_new.name",
  blue_glazed_terracotta: "tile.glazedTerracottaBlue.name",
  blue_orchid: "tile.red_flower.blueOrchid.name",
  blue_shulker_box: "tile.shulkerBoxBlue.name",
  blue_stained_glass: "tile.stained_glass.blue.name",
  blue_stained_glass_pane: "tile.stained_glass_pane.blue.name",
  blue_terracotta: "tile.stained_hardened_clay.blue.name",
  blue_wool: "tile.wool.blue.name",
  bogged_spawn_egg: "item.spawn_egg.entity.bogged.name",
  bone_meal: "item.dye.white.name",
  brain_coral: "tile.coral.pink.name",
  brain_coral_block: "tile.coral_block.pink.name",
  brain_coral_fan: "tile.coral_fan.pink_fan.name",
  breeze_spawn_egg: "item.spawn_egg.entity.breeze.name",
  brewing_stand: "item.brewing_stand.name",
  brick_slab: "tile.stone_slab.brick.name",
  brick_wall: "tile.cobblestone_wall.brick.name",
  brown_bundle: "item.brown_bundle",
  brown_carpet: "tile.carpet.brown.name",
  brown_concrete: "tile.concrete.brown.name",
  brown_concrete_powder: "tile.concretePowder.brown.name",
  brown_dye: "item.dye.brown_new.name",
  brown_glazed_terracotta: "tile.glazedTerracottaBrown.name",
  brown_mushroom_block: "tile.brown_mushroom_block.cap.name",
  brown_shulker_box: "tile.shulkerBoxBrown.name",
  brown_stained_glass: "tile.stained_glass.brown.name",
  brown_stained_glass_pane: "tile.stained_glass_pane.brown.name",
  brown_terracotta: "tile.stained_hardened_clay.brown.name",
  brown_wool: "tile.wool.brown.name",
  bubble_coral: "tile.coral.purple.name",
  bubble_coral_block: "tile.coral_block.purple.name",
  bubble_coral_fan: "tile.coral_fan.purple_fan.name",
  bundle: "item.bundle",
  camel_spawn_egg: "item.spawn_egg.entity.camel.name",
  carrot_on_a_stick: "item.carrotOnAStick.name",
  cat_spawn_egg: "item.spawn_egg.entity.cat.name",
  cave_spider_spawn_egg: "item.spawn_egg.entity.cave_spider.name",
  cherry_boat: "item.boat.cherry.name",
  cherry_chest_boat: "item.chest_boat.cherry.name",
  cherry_door: "item.cherry_door.name",
  cherry_hanging_sign: "item.cherry_hanging_sign.name",
  cherry_sign: "item.cherry_sign.name",
  chicken_spawn_egg: "item.spawn_egg.entity.chicken.name",
  chipped_anvil: "tile.anvil.slightlyDamaged.name",
  chiseled_quartz_block: "tile.quartz_block.chiseled.name",
  chiseled_red_sandstone: "tile.red_sandstone.chiseled.name",
  chiseled_sandstone: "tile.sandstone.chiseled.name",
  chiseled_stone_bricks: "tile.stonebrick.chiseled.name",
  coarse_dirt: "tile.dirt.coarse.name",
  cobblestone_slab: "tile.stone_slab.cobble.name",
  cocoa_beans: "item.dye.brown.name",
  cod: "item.fish.name",
  cod_bucket: "item.bucketFish.name",
  cod_spawn_egg: "item.spawn_egg.entity.cod.name",
  cooked_cod: "item.cooked_fish.name",
  cooked_mutton: "item.muttonCooked.name",
  cooked_porkchop: "item.porkchop_cooked.name",
  cornflower: "tile.red_flower.cornflower.name",
  cow_spawn_egg: "item.spawn_egg.entity.cow.name",
  cracked_stone_bricks: "tile.stonebrick.cracked.name",
  creaking_spawn_egg: "item.spawn_egg.entity.creaking.name",
  creeper_head: "item.skull.creeper.name",
  creeper_spawn_egg: "item.spawn_egg.entity.creeper.name",
  crimson_hanging_sign: "item.crimson_hanging_sign.name",
  crimson_roots: "tile.crimson_roots.crimsonRoots.name",
  crimson_sign: "tile.crimson_wall_sign.name",
  crimson_slab: "tile.crimson_double_slab.name",
  cut_red_sandstone: "tile.red_sandstone.cut.name",
  cut_red_sandstone_slab: "tile.stone_slab4.cut_red_sandstone.name",
  cut_sandstone: "tile.sandstone.cut.name",
  cut_sandstone_slab: "tile.stone_slab4.cut_sandstone.name",
  cyan_bundle: "item.cyan_bundle",
  cyan_carpet: "tile.carpet.cyan.name",
  cyan_concrete: "tile.concrete.cyan.name",
  cyan_concrete_powder: "tile.concretePowder.cyan.name",
  cyan_dye: "item.dye.cyan.name",
  cyan_glazed_terracotta: "tile.glazedTerracottaCyan.name",
  cyan_shulker_box: "tile.shulkerBoxCyan.name",
  cyan_stained_glass: "tile.stained_glass.cyan.name",
  cyan_stained_glass_pane: "tile.stained_glass_pane.cyan.name",
  cyan_terracotta: "tile.stained_hardened_clay.cyan.name",
  cyan_wool: "tile.wool.cyan.name",
  damaged_anvil: "tile.anvil.veryDamaged.name",
  dandelion: "tile.yellow_flower.dandelion.name",
  dark_oak_boat: "item.boat.big_oak.name",
  dark_oak_chest_boat: "item.chest_boat.big_oak.name",
  dark_oak_door: "item.dark_oak_door.name",
  dark_oak_fence: "tile.darkOakFence.name",
  dark_oak_hanging_sign: "item.dark_oak_hanging_sign.name",
  dark_oak_leaves: "tile.leaves2.big_oak.name",
  dark_oak_log: "tile.log.big_oak.name",
  dark_oak_planks: "tile.planks.big_oak.name",
  dark_oak_sapling: "tile.sapling.big_oak.name",
  dark_oak_sign: "tile.darkoak_standing_sign.name",
  dark_oak_slab: "tile.wooden_slab.big_oak.name",
  dark_oak_wood: "tile.wood.dark_oak.name",
  dark_prismarine: "tile.prismarine.dark.name",
  dark_prismarine_slab: "tile.stone_slab2.prismarine.dark.name",
  dead_brain_coral: "tile.coral.pink_dead.name",
  dead_brain_coral_block: "tile.coral_block.pink_dead.name",
  dead_brain_coral_fan: "tile.coral_fan_dead.pink_fan.name",
  dead_bubble_coral: "tile.coral.purple_dead.name",
  dead_bubble_coral_block: "tile.coral_block.purple_dead.name",
  dead_bubble_coral_fan: "tile.coral_fan_dead.purple_fan.name",
  dead_fire_coral: "tile.coral.red_dead.name",
  dead_fire_coral_block: "tile.coral_block.red_dead.name",
  dead_fire_coral_fan: "tile.coral_fan_dead.red_fan.name",
  dead_horn_coral: "tile.coral.yellow_dead.name",
  dead_horn_coral_block: "tile.coral_block.yellow_dead.name",
  dead_horn_coral_fan: "tile.coral_fan_dead.yellow_fan.name",
  dead_tube_coral: "tile.coral.blue_dead.name",
  dead_tube_coral_block: "tile.coral_block.blue_dead.name",
  dead_tube_coral_fan: "tile.coral_fan_dead.blue_fan.name",
  diamond_horse_armor: "item.horsearmordiamond.name",
  diorite: "tile.stone.diorite.name",
  diorite_slab: "tile.stone_slab3.diorite.name",
  diorite_wall: "tile.cobblestone_wall.diorite.name",
  disc_fragment_5: "item.disc_fragment.name",
  dolphin_spawn_egg: "item.spawn_egg.entity.dolphin.name",
  donkey_spawn_egg: "item.spawn_egg.entity.donkey.name",
  dragon_head: "item.skull.dragon.name",
  drowned_spawn_egg: "item.spawn_egg.entity.drowned.name",
  elder_guardian_spawn_egg: "item.spawn_egg.entity.elder_guardian.name",
  empty_map: "item.emptyMap.name",
  enchanted_golden_apple: "item.appleEnchanted.name",
  end_stone_brick_slab: "tile.stone_slab3.end_brick.name",
  end_stone_brick_wall: "tile.cobblestone_wall.end_brick.name",
  ender_chest: "tile.enderChest.name",
  ender_dragon_spawn_egg: "item.spawn_egg.entity.ender_dragon.name",
  enderman_spawn_egg: "item.spawn_egg.entity.enderman.name",
  endermite_spawn_egg: "item.spawn_egg.entity.endermite.name",
  evoker_spawn_egg: "item.spawn_egg.entity.evocation_illager.name",
  fern: "tile.tallgrass.fern.name",
  filled_map: "item.map.name",
  fire_charge: "item.fireball.name",
  fire_coral: "tile.coral.red.name",
  fire_coral_block: "tile.coral_block.red.name",
  fire_coral_fan: "tile.coral_fan.red_fan.name",
  firework_rocket: "item.fireworks.name",
  firework_star: "item.fireworksCharge.name",
  fox_spawn_egg: "item.spawn_egg.entity.fox.name",
  frog_spawn_egg: "item.spawn_egg.entity.frog.name",
  ghast_spawn_egg: "item.spawn_egg.entity.ghast.name",
  glistering_melon_slice: "item.speckled_melon.name",
  glow_squid_spawn_egg: "item.spawn_egg.entity.glow_squid.name",
  goat_spawn_egg: "item.spawn_egg.entity.goat.name",
  golden_horse_armor: "item.horsearmorgold.name",
  granite: "tile.stone.granite.name",
  granite_slab: "tile.stone_slab3.granite.name",
  granite_wall: "tile.cobblestone_wall.granite.name",
  grass_block: "tile.grass.name",
  gray_bundle: "item.gray_bundle",
  gray_carpet: "tile.carpet.gray.name",
  gray_concrete: "tile.concrete.gray.name",
  gray_concrete_powder: "tile.concretePowder.gray.name",
  gray_dye: "item.dye.gray.name",
  gray_glazed_terracotta: "tile.glazedTerracottaGray.name",
  gray_shulker_box: "tile.shulkerBoxGray.name",
  gray_stained_glass: "tile.stained_glass.gray.name",
  gray_stained_glass_pane: "tile.stained_glass_pane.gray.name",
  gray_terracotta: "tile.stained_hardened_clay.gray.name",
  gray_wool: "tile.wool.gray.name",
  green_bundle: "item.green_bundle",
  green_carpet: "tile.carpet.green.name",
  green_concrete: "tile.concrete.green.name",
  green_concrete_powder: "tile.concretePowder.green.name",
  green_dye: "item.dye.green.name",
  green_glazed_terracotta: "tile.glazedTerracottaGreen.name",
  green_shulker_box: "tile.shulkerBoxGreen.name",
  green_stained_glass: "tile.stained_glass.green.name",
  green_stained_glass_pane: "tile.stained_glass_pane.green.name",
  green_terracotta: "tile.stained_hardened_clay.green.name",
  green_wool: "tile.wool.green.name",
  guardian_spawn_egg: "item.spawn_egg.entity.guardian.name",
  hardened_clay: "tile.stained_hardened_clay.name",
  hoglin_spawn_egg: "item.spawn_egg.entity.hoglin.name",
  horn_coral: "tile.coral.yellow.name",
  horn_coral_block: "tile.coral_block.yellow.name",
  horn_coral_fan: "tile.coral_fan.yellow_fan.name",
  horse_spawn_egg: "item.spawn_egg.entity.horse.name",
  husk_spawn_egg: "item.spawn_egg.entity.husk.name",
  infested_chiseled_stone_bricks: "tile.monster_egg.chiseledbrick.name",
  infested_cobblestone: "tile.monster_egg.cobble.name",
  infested_cracked_stone_bricks: "tile.monster_egg.crackedbrick.name",
  infested_mossy_stone_bricks: "tile.monster_egg.mossybrick.name",
  infested_stone: "tile.monster_egg.stone.name",
  infested_stone_bricks: "tile.monster_egg.brick.name",
  ink_sac: "item.dye.black.name",
  iron_golem_spawn_egg: "item.spawn_egg.entity.iron_golem.name",
  iron_horse_armor: "item.horsearmoriron.name",
  jungle_boat: "item.boat.jungle.name",
  jungle_chest_boat: "item.chest_boat.jungle.name",
  jungle_door: "item.jungle_door.name",
  jungle_fence: "tile.jungleFence.name",
  jungle_hanging_sign: "item.jungle_hanging_sign.name",
  jungle_leaves: "tile.leaves.jungle.name",
  jungle_log: "tile.log.jungle.name",
  jungle_planks: "tile.planks.jungle.name",
  jungle_sapling: "tile.sapling.jungle.name",
  jungle_sign: "tile.jungle_standing_sign.name",
  jungle_slab: "tile.wooden_slab.jungle.name",
  jungle_wood: "tile.wood.jungle.name",
  kelp: "item.kelp.name",
  lapis_lazuli: "item.dye.blue.name",
  large_fern: "tile.double_plant.fern.name",
  lava_bucket: "item.bucketLava.name",
  leather_horse_armor: "item.horsearmorleather.name",
  light_block_0: "tile.light_block.name",
  light_block_1: "tile.light_block.name",
  light_block_2: "tile.light_block.name",
  light_block_3: "tile.light_block.name",
  light_block_4: "tile.light_block.name",
  light_block_5: "tile.light_block.name",
  light_block_6: "tile.light_block.name",
  light_block_7: "tile.light_block.name",
  light_block_8: "tile.light_block.name",
  light_block_9: "tile.light_block.name",
  light_block_10: "tile.light_block.name",
  light_block_11: "tile.light_block.name",
  light_block_12: "tile.light_block.name",
  light_block_13: "tile.light_block.name",
  light_block_14: "tile.light_block.name",
  light_block_15: "tile.light_block.name",
  light_blue_bundle: "item.light_blue_bundle",
  light_blue_carpet: "tile.carpet.lightBlue.name",
  light_blue_concrete: "tile.concrete.lightBlue.name",
  light_blue_concrete_powder: "tile.concretePowder.lightBlue.name",
  light_blue_dye: "item.dye.lightBlue.name",
  light_blue_glazed_terracotta: "tile.glazedTerracottaLightBlue.name",
  light_blue_shulker_box: "tile.shulkerBoxLightBlue.name",
  light_blue_stained_glass: "tile.stained_glass.light_blue.name",
  light_blue_stained_glass_pane: "tile.stained_glass_pane.light_blue.name",
  light_blue_terracotta: "tile.stained_hardened_clay.lightBlue.name",
  light_blue_wool: "tile.wool.lightBlue.name",
  light_gray_bundle: "item.light_gray_bundle",
  light_gray_carpet: "tile.carpet.silver.name",
  light_gray_concrete: "tile.concrete.silver.name",
  light_gray_concrete_powder: "tile.concretePowder.silver.name",
  light_gray_dye: "item.dye.silver.name",
  light_gray_shulker_box: "tile.shulkerBoxSilver.name",
  light_gray_stained_glass: "tile.stained_glass.silver.name",
  light_gray_stained_glass_pane: "tile.stained_glass_pane.silver.name",
  light_gray_terracotta: "tile.stained_hardened_clay.silver.name",
  light_gray_wool: "tile.wool.silver.name",
  lilac: "tile.double_plant.syringa.name",
  lily_of_the_valley: "tile.red_flower.lilyOfTheValley.name",
  lime_bundle: "item.lime_bundle",
  lime_carpet: "tile.carpet.lime.name",
  lime_concrete: "tile.concrete.lime.name",
  lime_concrete_powder: "tile.concretePowder.lime.name",
  lime_dye: "item.dye.lime.name",
  lime_glazed_terracotta: "tile.glazedTerracottaLime.name",
  lime_shulker_box: "tile.shulkerBoxLime.name",
  lime_stained_glass: "tile.stained_glass.lime.name",
  lime_stained_glass_pane: "tile.stained_glass_pane.lime.name",
  lime_terracotta: "tile.stained_hardened_clay.lime.name",
  lime_wool: "tile.wool.lime.name",
  llama_spawn_egg: "item.spawn_egg.entity.llama.name",
  lodestone_compass: "item.lodestonecompass.name",
  magenta_bundle: "item.magenta_bundle",
  magenta_carpet: "tile.carpet.magenta.name",
  magenta_concrete: "tile.concrete.magenta.name",
  magenta_concrete_powder: "tile.concretePowder.magenta.name",
  magenta_dye: "item.dye.magenta.name",
  magenta_glazed_terracotta: "tile.glazedTerracottaMagenta.name",
  magenta_shulker_box: "tile.shulkerBoxMagenta.name",
  magenta_stained_glass: "tile.stained_glass.magenta.name",
  magenta_stained_glass_pane: "tile.stained_glass_pane.magenta.name",
  magenta_terracotta: "tile.stained_hardened_clay.magenta.name",
  magenta_wool: "tile.wool.magenta.name",
  magma_cube_spawn_egg: "item.spawn_egg.entity.magma_cube.name",
  mangrove_boat: "item.boat.mangrove.name",
  mangrove_chest_boat: "item.chest_boat.mangrove.name",
  mangrove_door: "item.mangrove_door.name",
  mangrove_hanging_sign: "item.mangrove_hanging_sign.name",
  mangrove_sign: "item.mangrove_sign.name",
  melon_slice: "item.melon.name",
  milk_bucket: "item.milk.name",
  mooshroom_spawn_egg: "item.spawn_egg.entity.mooshroom.name",
  mossy_cobblestone_slab: "tile.stone_slab2.mossy_cobblestone.name",
  mossy_cobblestone_wall: "tile.cobblestone_wall.mossy.name",
  mossy_stone_brick_slab: "tile.stone_slab4.mossy_stone_brick.name",
  mossy_stone_brick_wall: "tile.cobblestone_wall.mossy_stone_brick.name",
  mossy_stone_bricks: "tile.stonebrick.mossy.name",
  mule_spawn_egg: "item.spawn_egg.entity.mule.name",
  mushroom_stem: "tile.brown_mushroom_block.stem.name",
  music_disc_5: "item.record.name",
  music_disc_11: "item.record.name",
  music_disc_13: "item.record.name",
  music_disc_blocks: "item.record.name",
  music_disc_cat: "item.record.name",
  music_disc_chirp: "item.record.name",
  music_disc_creator: "item.record.name",
  music_disc_creator_music_box: "item.record.name",
  music_disc_far: "item.record.name",
  music_disc_mall: "item.record.name",
  music_disc_mellohi: "item.record.name",
  music_disc_otherside: "item.record.name",
  music_disc_pigstep: "item.record.name",
  music_disc_precipice: "item.record.name",
  music_disc_relic: "item.record.name",
  music_disc_stal: "item.record.name",
  music_disc_strad: "item.record.name",
  music_disc_wait: "item.record.name",
  music_disc_ward: "item.record.name",
  mutton: "item.muttonRaw.name",
  nether_brick_slab: "tile.stone_slab.nether_brick.name",
  nether_brick_wall: "tile.cobblestone_wall.nether_brick.name",
  nether_star: "item.netherStar.name",
  netherite_ingot: "item.smithing_template.netherite_upgrade.ingredients",
  normal_stone_slab: "tile.stone_slab4.stone.name",
  oak_boat: "item.boat.oak.name",
  oak_chest_boat: "item.chest_boat.oak.name",
  oak_fence: "tile.fence.name",
  oak_hanging_sign: "item.oak_hanging_sign.name",
  oak_leaves: "tile.leaves.oak.name",
  oak_log: "tile.log.oak.name",
  oak_planks: "tile.planks.oak.name",
  oak_sapling: "tile.sapling.oak.name",
  oak_sign: "item.sign.name",
  oak_slab: "tile.wooden_slab.oak.name",
  oak_wood: "tile.wood.oak.name",
  ocelot_spawn_egg: "item.spawn_egg.entity.ocelot.name",
  orange_bundle: "item.orange_bundle",
  orange_carpet: "tile.carpet.orange.name",
  orange_concrete: "tile.concrete.orange.name",
  orange_concrete_powder: "tile.concretePowder.orange.name",
  orange_dye: "item.dye.orange.name",
  orange_glazed_terracotta: "tile.glazedTerracottaOrange.name",
  orange_shulker_box: "tile.shulkerBoxOrange.name",
  orange_stained_glass: "tile.stained_glass.orange.name",
  orange_stained_glass_pane: "tile.stained_glass_pane.orange.name",
  orange_terracotta: "tile.stained_hardened_clay.orange.name",
  orange_tulip: "tile.red_flower.tulipOrange.name",
  orange_wool: "tile.wool.orange.name",
  oxeye_daisy: "tile.red_flower.oxeyeDaisy.name",
  pale_oak_boat: "item.boat.pale_oak.name",
  pale_oak_chest_boat: "item.chest_boat.pale_oak.name",
  pale_oak_door: "item.pale_oak_door.name",
  pale_oak_hanging_sign: "item.pale_oak_hanging_sign.name",
  pale_oak_sign: "item.pale_oak_sign.name",
  panda_spawn_egg: "item.spawn_egg.entity.panda.name",
  parrot_spawn_egg: "item.spawn_egg.entity.parrot.name",
  peony: "tile.double_plant.paeonia.name",
  petrified_oak_slab: "tile.stone_slab.wood.name",
  phantom_spawn_egg: "item.spawn_egg.entity.phantom.name",
  pig_spawn_egg: "item.spawn_egg.entity.pig.name",
  piglin_brute_spawn_egg: "item.spawn_egg.entity.piglin_brute.name",
  piglin_head: "item.skull.piglin.name",
  piglin_spawn_egg: "item.spawn_egg.entity.piglin.name",
  pillager_spawn_egg: "item.spawn_egg.entity.pillager.name",
  pink_bundle: "item.pink_bundle",
  pink_carpet: "tile.carpet.pink.name",
  pink_concrete: "tile.concrete.pink.name",
  pink_concrete_powder: "tile.concretePowder.pink.name",
  pink_dye: "item.dye.pink.name",
  pink_glazed_terracotta: "tile.glazedTerracottaPink.name",
  pink_shulker_box: "tile.shulkerBoxPink.name",
  pink_stained_glass: "tile.stained_glass.pink.name",
  pink_stained_glass_pane: "tile.stained_glass_pane.pink.name",
  pink_terracotta: "tile.stained_hardened_clay.pink.name",
  pink_tulip: "tile.red_flower.tulipPink.name",
  pink_wool: "tile.wool.pink.name",
  player_head: "item.skull.char.name",
  polar_bear_spawn_egg: "item.spawn_egg.entity.polar_bear.name",
  polished_andesite: "tile.stone.andesiteSmooth.name",
  polished_andesite_slab: "tile.stone_slab3.andesite.smooth.name",
  polished_diorite: "tile.stone.dioriteSmooth.name",
  polished_diorite_slab: "tile.stone_slab3.diorite.smooth.name",
  polished_granite: "tile.stone.graniteSmooth.name",
  polished_granite_slab: "tile.stone_slab3.granite.smooth.name",
  popped_chorus_fruit: "item.chorus_fruit_popped.name",
  poppy: "tile.red_flower.poppy.name",
  powder_snow_bucket: "item.bucketPowderSnow.name",
  prismarine: "tile.prismarine.rough.name",
  prismarine_brick_slab: "tile.stone_slab2.prismarine.bricks.name",
  prismarine_bricks: "tile.prismarine.bricks.name",
  prismarine_slab: "tile.stone_slab2.prismarine.rough.name",
  prismarine_wall: "tile.cobblestone_wall.prismarine.name",
  pufferfish_bucket: "item.bucketPuffer.name",
  pufferfish_spawn_egg: "item.spawn_egg.entity.pufferfish.name",
  purple_bundle: "item.purple_bundle",
  purple_carpet: "tile.carpet.purple.name",
  purple_concrete: "tile.concrete.purple.name",
  purple_concrete_powder: "tile.concretePowder.purple.name",
  purple_dye: "item.dye.purple.name",
  purple_glazed_terracotta: "tile.glazedTerracottaPurple.name",
  purple_shulker_box: "tile.shulkerBoxPurple.name",
  purple_stained_glass: "tile.stained_glass.purple.name",
  purple_stained_glass_pane: "tile.stained_glass_pane.purple.name",
  purple_terracotta: "tile.stained_hardened_clay.purple.name",
  purple_wool: "tile.wool.purple.name",
  purpur_block: "tile.purpur_block.default.name",
  purpur_pillar: "tile.purpur_block.lines.name",
  purpur_slab: "tile.stone_slab2.purpur.name",
  quartz_pillar: "tile.quartz_block.lines.name",
  quartz_slab: "tile.stone_slab.quartz.name",
  rabbit_spawn_egg: "item.spawn_egg.entity.rabbit.name",
  ravager_spawn_egg: "item.spawn_egg.entity.ravager.name",
  red_bundle: "item.red_bundle",
  red_carpet: "tile.carpet.red.name",
  red_concrete: "tile.concrete.red.name",
  red_concrete_powder: "tile.concretePowder.red.name",
  red_dye: "item.dye.red.name",
  red_glazed_terracotta: "tile.glazedTerracottaRed.name",
  red_nether_brick_slab: "tile.stone_slab2.red_nether_brick.name",
  red_nether_brick_wall: "tile.cobblestone_wall.red_nether_brick.name",
  red_sand: "tile.sand.red.name",
  red_sandstone_slab: "tile.stone_slab2.red_sandstone.name",
  red_sandstone_wall: "tile.cobblestone_wall.red_sandstone.name",
  red_shulker_box: "tile.shulkerBoxRed.name",
  red_stained_glass: "tile.stained_glass.red.name",
  red_stained_glass_pane: "tile.stained_glass_pane.red.name",
  red_terracotta: "tile.stained_hardened_clay.red.name",
  red_tulip: "tile.red_flower.tulipRed.name",
  red_wool: "tile.wool.red.name",
  redstone: "tile.redstone_wire.name",
  rose_bush: "tile.double_plant.rose.name",
  salmon_bucket: "item.bucketSalmon.name",
  salmon_spawn_egg: "item.spawn_egg.entity.salmon.name",
  sandstone_slab: "tile.stone_slab.sand.name",
  sandstone_wall: "tile.cobblestone_wall.sandstone.name",
  sea_lantern: "tile.seaLantern.name",
  seagrass: "tile.seagrass.seagrass.name",
  sheep_spawn_egg: "item.spawn_egg.entity.sheep.name",
  short_grass: "tile.tallgrass.name",
  shulker_spawn_egg: "item.spawn_egg.entity.shulker.name",
  silver_glazed_terracotta: "tile.glazedTerracottaSilver.name",
  silverfish_spawn_egg: "item.spawn_egg.entity.silverfish.name",
  skeleton_horse_spawn_egg: "item.spawn_egg.entity.skeleton_horse.name",
  skeleton_skull: "item.skull.skeleton.name",
  skeleton_spawn_egg: "item.spawn_egg.entity.skeleton.name",
  slime_spawn_egg: "item.spawn_egg.entity.slime.name",
  smooth_quartz: "tile.quartz_block.smooth.name",
  smooth_quartz_slab: "tile.stone_slab4.smooth_quartz.name",
  smooth_red_sandstone: "tile.red_sandstone.smooth.name",
  smooth_red_sandstone_slab: "tile.stone_slab3.red_sandstone.smooth.name",
  smooth_sandstone: "tile.sandstone.smooth.name",
  smooth_sandstone_slab: "tile.stone_slab2.sandstone.smooth.name",
  smooth_stone_slab: "tile.stone_slab.stone.name",
  sniffer_spawn_egg: "item.spawn_egg.entity.sniffer.name",
  snow_golem_spawn_egg: "item.spawn_egg.entity.snow_golem.name",
  spider_spawn_egg: "item.spawn_egg.entity.spider.name",
  sponge: "tile.sponge.dry.name",
  spruce_boat: "item.boat.spruce.name",
  spruce_chest_boat: "item.chest_boat.spruce.name",
  spruce_door: "item.spruce_door.name",
  spruce_fence: "tile.spruceFence.name",
  spruce_hanging_sign: "item.spruce_hanging_sign.name",
  spruce_leaves: "tile.leaves.spruce.name",
  spruce_log: "tile.log.spruce.name",
  spruce_planks: "tile.planks.spruce.name",
  spruce_sapling: "tile.sapling.spruce.name",
  spruce_sign: "tile.spruce_standing_sign.name",
  spruce_slab: "tile.wooden_slab.spruce.name",
  spruce_wood: "tile.wood.spruce.name",
  squid_spawn_egg: "item.spawn_egg.entity.squid.name",
  stone: "tile.stone.stone.name",
  stone_brick_slab: "tile.stone_slab.smoothStoneBrick.name",
  stone_brick_wall: "tile.cobblestone_wall.stone_brick.name",
  stone_bricks: "tile.stonebrick.name",
  stray_spawn_egg: "item.spawn_egg.entity.stray.name",
  strider_spawn_egg: "item.spawn_egg.entity.strider.name",
  stripped_acacia_wood: "tile.wood.stripped.acacia.name",
  stripped_birch_wood: "tile.wood.stripped.birch.name",
  stripped_dark_oak_wood: "tile.wood.stripped.dark_oak.name",
  stripped_jungle_wood: "tile.wood.stripped.jungle.name",
  stripped_oak_wood: "tile.wood.stripped.oak.name",
  stripped_spruce_wood: "tile.wood.stripped.spruce.name",
  sugar_cane: "item.reeds.name",
  sunflower: "tile.double_plant.sunflower.name",
  tadpole_bucket: "item.bucketTadpole.name",
  tadpole_spawn_egg: "item.spawn_egg.entity.tadpole.name",
  tall_grass: "tile.double_plant.grass.name",
  totem_of_undying: "item.totem.name",
  trader_llama_spawn_egg: "item.spawn_egg.entity.trader_llama.name",
  tropical_fish: "item.clownfish.name",
  tropical_fish_bucket: "item.bucketTropical.name",
  tropical_fish_spawn_egg: "item.spawn_egg.entity.tropicalfish.name",
  tube_coral: "tile.coral.blue.name",
  tube_coral_block: "tile.coral_block.blue.name",
  tube_coral_fan: "tile.coral_fan.blue_fan.name",
  turtle_scute: "item.turtle_shell_piece.name",
  turtle_spawn_egg: "item.spawn_egg.entity.turtle.name",
  undyed_shulker_box: "tile.shulkerBox.name",
  vex_spawn_egg: "item.spawn_egg.entity.vex.name",
  villager_spawn_egg: "item.spawn_egg.entity.villager_v2.name",
  vindicator_spawn_egg: "item.spawn_egg.entity.vindicator.name",
  wandering_trader_spawn_egg: "item.spawn_egg.entity.wandering_trader.name",
  warden_spawn_egg: "item.spawn_egg.entity.warden.name",
  warped_roots: "tile.warped_roots.warpedRoots.name",
  warped_sign: "tile.warped_wall_sign.name",
  warped_slab: "tile.warped_double_slab.name",
  water_bucket: "item.bucketWater.name",
  wet_sponge: "tile.sponge.wet.name",
  white_bundle: "item.white_bundle",
  white_carpet: "tile.carpet.white.name",
  white_concrete: "tile.concrete.white.name",
  white_concrete_powder: "tile.concretePowder.white.name",
  white_dye: "item.dye.white_new.name",
  white_glazed_terracotta: "tile.glazedTerracottaWhite.name",
  white_shulker_box: "tile.shulkerBoxWhite.name",
  white_stained_glass: "tile.stained_glass.white.name",
  white_stained_glass_pane: "tile.stained_glass_pane.white.name",
  white_terracotta: "tile.stained_hardened_clay.white.name",
  white_tulip: "tile.red_flower.tulipWhite.name",
  white_wool: "tile.wool.white.name",
  witch_spawn_egg: "item.spawn_egg.entity.witch.name",
  wither_skeleton_skull: "item.skull.wither.name",
  wither_skeleton_spawn_egg: "item.spawn_egg.entity.wither_skeleton.name",
  wither_spawn_egg: "item.spawn_egg.entity.wither.name",
  wolf_spawn_egg: "item.spawn_egg.entity.wolf.name",
  yellow_bundle: "item.yellow_bundle",
  yellow_carpet: "tile.carpet.yellow.name",
  yellow_concrete: "tile.concrete.yellow.name",
  yellow_concrete_powder: "tile.concretePowder.yellow.name",
  yellow_dye: "item.dye.yellow.name",
  yellow_glazed_terracotta: "tile.glazedTerracottaYellow.name",
  yellow_shulker_box: "tile.shulkerBoxYellow.name",
  yellow_stained_glass: "tile.stained_glass.yellow.name",
  yellow_stained_glass_pane: "tile.stained_glass_pane.yellow.name",
  yellow_terracotta: "tile.stained_hardened_clay.yellow.name",
  yellow_wool: "tile.wool.yellow.name",
  zoglin_spawn_egg: "item.spawn_egg.entity.zoglin.name",
  zombie_head: "item.skull.zombie.name",
  zombie_horse_spawn_egg: "item.spawn_egg.entity.zombie_horse.name",
  zombie_pigman_spawn_egg: "item.spawn_egg.entity.zombie_pigman.name",
  zombie_spawn_egg: "item.spawn_egg.entity.zombie.name",
  zombie_villager_spawn_egg: "item.spawn_egg.entity.zombie_villager_v2.name",
};

function getIdByLocalizationID(key: string): string | undefined {
  const id = Object.keys(LocalizationIDs).find((k) => LocalizationIDs[k] === key);
  return 'minecraft:' + (id ? id : key.replace('tile.', '').replace('item.', '').replace('.name', '').trim());
}