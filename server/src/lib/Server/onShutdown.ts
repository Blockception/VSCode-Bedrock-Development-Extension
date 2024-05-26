import { Console } from "../Manager/Console";

/**
 * The code to run when the server is shutting down
 */
export async function onShutdownAsync(): Promise<void> {
  return Promise.resolve(onShutdown());
}

/**
 * The code to run when the server is shutting down
 */
function onShutdown(): void {
  Console.Log("shutting down minecraft server");
}
