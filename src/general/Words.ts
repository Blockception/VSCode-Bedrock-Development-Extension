export function GetWords(text : string) : string[] {
    var out = new Array();
    var level = 0;
    var startindex = 0;

    for (var index = 0; index < text.length; index++){
        var c = text.charAt(index);

        switch (c){
            case "[":
            case "(":
            case "{":
                level++;
                break;

            case "]":
            case ")":
            case "}":
                level--;
                break;

            case " ":
            case "\t":
                if (level == 0){
                    if (startindex < index){
                        var word = text.substring(startindex, index);
                        out.push(word);
                    }

                    startindex = index;
                }

                break;
            default:
                break;
        }

        if (level < 0)
            break;
    }

    return out;
}

export function GetWordsFromRange(text : string, endindex : number) : string[] {
    var out = new Array();
    var level = 0;
    var startindex = 0;

    for (var index = 0; index < endindex; index++){
        var c = text.charAt(index);

        switch (c){
            case "[":
            case "(":
            case "{":
                level++;
                break;

            case "]":
            case ")":
            case "}":
                level--;
                break;

            case " ":
            case "\t":
                if (level == 0){
                    if (startindex < index){
                        var word = text.substring(startindex, index);
                        out.push(word);
                    }

                    startindex = index;
                }

                break;
            default:
                break;
        }

        if (level < 0)
            break;
    }

    return out;
}