import { Minecraft } from 'bc-minecraft-bedrock-types';


export function getAttribute(attr : string, selector : string) : string[] {
    const sel = Minecraft.Selector.Selector.parse(selector);
    const types = sel.get(attr).map(castToString);

    return types
}

function castToString(attr : Minecraft.Selector.SelectorAttribute) : string {
    if (attr instanceof Minecraft.Selector.SelectorValueAttribute) {
        return attr.getValue().text;
    }

    return ""
}