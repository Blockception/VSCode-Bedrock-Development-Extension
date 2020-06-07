export function GetWords(text : string) : string[] {
    var out = new Array<string>();
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

    if (startindex < text.length){
        var word = text.substring(startindex, text.length);
        out.push(word);
    }

    return out;
}

export function GetWordsFromRange(text : string, endindex : number) : string[] {
    var out = new Array<string>();
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

        if (startindex < endindex){
            var word = text.substring(startindex, endindex);
            out.push(word);
        }

        if (level < 0)
            break;
    }

    return out;
}

export class RangedWord {
    text: string;
    startindex : number;
    endindex : number;

    constructor(text: string, startindex : number, endindex : number){
        this.text = text;
        this.startindex = startindex;
        this.endindex = endindex; 
    }

    static GetWords(text : string) : RangedWord[] {
        var out = new Array<RangedWord>();
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
                            var RW = new RangedWord(text.substring(startindex, index).trim(), startindex, index);
                            out.push(RW);
                        }
    
                        startindex = index + 1;
                    }
    
                    break;
                default:
                    break;
            }
    
            if (level < 0)
                break;
        }

        if (startindex < text.length){
            var RW = new RangedWord(text.substring(startindex, text.length), startindex, text.length);
            out.push(RW);
        }
    
        return out;
    }
}