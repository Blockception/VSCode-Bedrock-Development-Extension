export function GenerateSafeID(ID: string): string {
  let Index = ID.indexOf(":");

  if (Index > -1) {
    ID = ID.substring(Index + 1);
  }

  ID = ID.replace(/:/gi, ".");

  return ID;
}
