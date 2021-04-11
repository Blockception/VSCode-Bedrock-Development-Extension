export function GetComment(line: string): string {
  const Index = line.indexOf("#");

  if (Index < 0) return "";

  return line.slice(Index + 1, line.length);
}
