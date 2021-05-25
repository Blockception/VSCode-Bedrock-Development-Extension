import { DiagnosticsBuilder } from "../../../Diagnostics/include";
import { JsonDocument } from "../../Document/include";
import { Animation } from "../Animation/Animation";
import { Script } from "./Script";

export function ProvideDiagnostic(script: Script | undefined, Animations: Animation | undefined, JDOC: JsonDocument, builder: DiagnosticsBuilder): void {
  if (script === undefined) return;

  if (script.animate) {
    for (let anim of script.animate) {
      if (typeof anim !== "string") {
        anim = anim[0];
      }

      if (!Animation.hasID(Animations, anim)) {
        const range = JDOC.RangeOf(anim);

        builder.Add(`Missing animation definition: ${anim}`, range).code = "script.animation.missing";
      }
    }
  }
}
