import { CommandCompletionContext } from "../builder/context";
import { Kinds } from "../../Minecraft/General/Kinds";

export function provideCompletion(context: CommandCompletionContext): void {
  const receiver = context.receiver;
  const Kind = Kinds.Completion.Coordinate;

  receiver.add({label:"~", documentation: "Relative coordinate", kind: Kind}).preselect = true;
  receiver.add({label:"~1", documentation: "Relative coordinate", kind: Kind});
  receiver.add({label:"~-1", documentation: "Relative coordinate", kind: Kind});
  receiver.add({label:"^1", documentation: "Local coordinate", kind: Kind});
  receiver.add({label:"^", documentation: "Local coordinate", kind: Kind});
  receiver.add({label:"^-1", documentation: "Local coordinate", kind: Kind});
  receiver.add({label:"1", documentation: "Coordinate", kind: Kind});
  receiver.add({label:"-1", documentation: "Coordinate", kind: Kind});
}
