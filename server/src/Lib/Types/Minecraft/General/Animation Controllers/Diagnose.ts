import { Range } from "vscode-languageserver-types";
import { DiagnosticsBuilder } from "../../../../Diagnostics/Builder";
import { Transition } from "../../Behavior/Animation Controllers/Animation Controller";
import * as BP from "../../Behavior/include";
import * as RP from "../../Resource/include";

export type AnimationController = BP.Animation_Controllers.AnimationController | RP.Animation_Controllers.AnimationController;

export function ProvideDiagnostic(Data: AnimationController, Builder: DiagnosticsBuilder): void {
  const controllers = Data.animation_controllers;

  for (const contKey in controllers) {
    let controller = controllers[contKey];

    if (controller.states) {
      const States = Object.getOwnPropertyNames(controller.states);

      for (const StateKey in States) {
        let State = controller.states[StateKey];

        if (State.transitions) CheckTransition(contKey, State.transitions, States, Builder);
      }
    }
  }
}

function CheckTransition(controller: string, Transitions: Transition[], States: string[], Builder: DiagnosticsBuilder): void {
  for (const Trans in Transitions) {
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

      Builder.Add("Cannot find state: " + State, R);
    }
  }
}
