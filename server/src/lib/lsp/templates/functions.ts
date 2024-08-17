export function safeID(ID: string, replace: string = "_"): string {
  ID = ID.replace(/[:]/gi, replace);

  return ID;
}

export function safeIDWithoutNamespaces(ID: string, replace: string = "_"): string {
  const index = ID.indexOf(":");

  if (index > 0) ID = ID.substring(index + 1);

  ID = ID.replace(/[:]/gi, replace);

  return ID;
}
