import * as Words from "./Words"
import { TextLine, Position } from "vscode";

export class SyntaxTree {
    public Root : SyntaxItem | undefined;

    constructor(){
        this.Root = undefined;
    }

    static ParseTree(line : TextLine, position : Position) : SyntaxTree {
        var NewWords = Words.RangedWord.GetWordsFromRange(line.text, position.character);
        return this.ParseFromWords(NewWords);
    }

    static ParseEntireTree(line : TextLine) : SyntaxTree {
        var NewWords = Words.RangedWord.GetWords(line.text);
        return this.ParseFromWords(NewWords);
    }

    static ParseFromWords(Words : Words.RangedWord[]) : SyntaxTree {
        var Out = new SyntaxTree();

        if (Words.length == 0)
            return Out;

        var Parent = new SyntaxItem(Words[0], undefined);
        Out.Root = Parent;
        var Child;

        for (var I = 1; I < Words.length; I++){
            Child = new SyntaxItem(Words[1], undefined);
            Parent.Child = Child;

            Parent = Child;
        }

        return Out;
    }
}

export class SyntaxItem {
    public Text : Words.RangedWord;
    public Child : SyntaxItem | undefined;

    constructor(Text : Words.RangedWord, Child : SyntaxItem | undefined) {
        this.Text = Text;
        this.Child = Child;
    }

    IsSelector() : boolean {
        if (this.Text?.text.startsWith("@"))
            return true;

        return false;
    }

    IsJson() : boolean {
        if (this.Text?.text.startsWith("[") || this.Text?.text.startsWith("{"))
            return true;

        return false;
    }

    IsString() : boolean {
        if (this.Text?.text.startsWith('"'))
            return true;

        return false;
    }
}