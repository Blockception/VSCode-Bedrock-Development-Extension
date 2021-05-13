import { Range } from "vscode-languageserver-types";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { Transition } from "../../Behavior/Animation Controllers/Animation Controller";
import * as BP from "../../Behavior/include";
import * as RP from "../../Resource/include";

export type AnimationController = BP.Animation_Controllers.AnimationController | RP.Animation_Controllers.AnimationController;

/**
 *
 * @param Data
 * @param Builder
 */
export function ProvideDiagnostic(Data: AnimationController, Builder: DiagnosticsBuilder): void {
  const controllers = Data.animation_controllers;

  for (const contKey in controllers) {
    let controller = controllers[contKey];

    if (controller.states) {
      const States = Object.getOwnPropertyNames(controller.states);

      for (var I = 0; I < States.length; I++) {
        let State = controller.states[States[I]];

        if (State.transitions) CheckTransition(contKey, State.transitions, States, Builder);
      }
    }
  }
}

/**
 *
 * @param controller
 * @param Transitions
 * @param States
 * @param Builder
 */
function CheckTransition(controller: string, Transitions: Transition[], States: string[], Builder: DiagnosticsBuilder): void {
  for (var I = 0; I < Transitions.length; I++) {
    const Trans = Transitions[I];
    let State: string;

    if (typeof Trans === "string") {
      State = Trans;
    } else {
      State = Object.getOwnPropertyNames(Trans)[0];
    }

    if (!States.includes(State)) {
      let P = Builder.doc.getText().indexOf(controller);
      let R: Range = {
        start: Builder.doc.positionAt(P),
        end: Builder.doc.positionAt(P + controller.length),
      };

      Builder.Add("Cannot find state: " + State, R).code = "ac.state.missing";
    }
  }
}
