export function GetCommand(Text: string) : string {
    var Index = Text.indexOf(" ");

    if (Index <= 0)
        return "";

    return Text.substring(0, Index);
}