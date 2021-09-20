/**
 * The code to run when the server is shutting down
 */
export async function onShutdownAsync(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    resolve(onShutdown());
  });
}

/**
 * The code to run when the server is shutting down
 */
function onShutdown(): void {
  console.log("shutting down minecraft server");
}
