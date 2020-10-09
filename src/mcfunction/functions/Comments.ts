export function RemoveComment(text : string) : string {
    let Index = text.indexOf('#');

    if (Index <= 0)
        return text;

    return text.substring(Index, text.length);
}