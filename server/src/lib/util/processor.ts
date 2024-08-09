import { QueueProcessor } from "@daanv2/queue-processor";
import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/types";
import { CancellationToken, WorkDoneProgressReporter } from "vscode-languageserver";

export namespace Processor {
  /**
   *
   * @param data
   * @param callbackFn
   * @param token
   * @param reporter
   * @returns
   */
  export function forEach<T>(
    data: T[],
    callbackFn: (item: T, index: number, col: T[]) => void | Promise<void>,
    token?: CancellationToken,
    reporter?: Pick<WorkDoneProgressReporter, "report">
  ): Promise<void> {
    token = token || CancellationToken.None;
    reporter = reporter || { report: () => {} };

    return QueueProcessor.forEach(data, (item, index, col) => {
      if (token.isCancellationRequested) return;
      if (Identifiable.is(item)) {
        reporter.report(index / col.length, item.id);
      } else if (typeof item === "string") {
        reporter.report(index / col.length, item);
      } else {
        reporter.report(index / col.length);
      }

      return callbackFn(item, index, col);
    }).then(() => {});
  }

  export async function map<T, U>(
    data: T[],
    callbackFn: (item: T, index: number, col: T[]) => U | Promise<U>,
    token?: CancellationToken,
    reporter?: WorkDoneProgressReporter
  ): Promise<U[]> {
    token = token || CancellationToken.None;
    reporter = reporter || {
      begin: () => {},
      done: () => {},
      report: () => {},
    };

    const result: U[] = [];

    await QueueProcessor.forEach(data, async (item, index, col) => {
      if (token.isCancellationRequested) return;
      if (Identifiable.is(item)) {
        reporter.report(index / col.length, item.id);
      } else {
        reporter.report(index / col.length);
      }

      const r = await callbackFn(item, index, col);
      result.push(r);
    });

    return result;
  }
}
