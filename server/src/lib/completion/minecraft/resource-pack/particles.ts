import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types/identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../builder/builder";
import { Database } from "../../../database/database";
import { IsEducationEnabled } from "../../../project/Attributes";
import { Kinds } from "../../../constants/kinds";

export function provideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The particle: ${item.id}`;
  const generateV = (item: string) => `The vanilla particle: ${item}`;

  context.receiver.generate(Database.ProjectData.ResourcePacks.particles, generateDoc, Kinds.Completion.Particle);
  context.receiver.generate(MinecraftData.vanilla.ResourcePack.particles, generateV, Kinds.Completion.Particle);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.generate(MinecraftData.edu.ResourcePack.particles, generateV, Kinds.Completion.Particle);
}
