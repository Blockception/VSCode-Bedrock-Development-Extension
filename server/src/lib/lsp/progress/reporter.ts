import { ServerRequestHandler } from "vscode-languageserver";

export function warpReporter<P, R, PR, E>(
  title: string,
  call: ServerRequestHandler<P, R, PR, E>
): ServerRequestHandler<P, R, PR, E> {
  return async function (params, token, workDoneProgress, resultProgress) {
    try {
      workDoneProgress.begin(title, 0, undefined, false);

      return call(params, token, workDoneProgress, resultProgress);
    } finally {
      workDoneProgress.done();
    }
  };
}
