

export function GetWords(Line: string) : string[] {
    let words: string[] = new Array();
    var Startindex = 0;

    for (let index = 0; index < Line.length; index++) {
        var c = Line.charAt(index);

        if (c == " " || c == "\t"){
            if (index > Startindex){
                words.push(Line.substring(Startindex, index))
            }

            Startindex = index;
        }
        else if (c == "#"){
            break;
        }
    }

    if (Startindex < Line.length){
        words.push(Line.substring(Startindex, Line.length))
    }

    return words;
}

export function GetWords2(Line: string, endindex: number) : string[] {
    let words: string[] = new Array();
    var Startindex = 0;

    for (let index = 0; index < endindex; index++) {
        var c = Line.charAt(index);

        if (c == " " || c == "\t"){
            if (index > Startindex){
                words.push(Line.substring(Startindex, index))
            }

            Startindex = index;
        }
        else if (c == "#"){
            break;
        }
    }

    if (Startindex < endindex){
        words.push(Line.substring(Startindex, Line.length))
    }

    return words;
}