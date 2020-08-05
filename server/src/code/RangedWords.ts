/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Range } from 'vscode-languageserver';

export class RangedWord {
    //The text of the word
    text: string;

    //The start index of the word in the string
    startindex: number;

    //The end index of the word in the string
    endindex: number;

    constructor(text: string, startindex: number, endindex: number) {
        this.text = text;
        this.startindex = startindex;
        this.endindex = endindex;
    }

    //Creates a range of the given word
    ToRange(lineIndex: number): Range {
        return Range.create(lineIndex, this.startindex, lineIndex, this.endindex);
    }

    //returns true or false is the cursor is inside this word
    CheckCursor(cursorPos: number) : boolean {
        if (cursorPos >= this.startindex && cursorPos <= this.endindex){
            return true;
        }

        return false;
    }

    //Converts the given text into words
    static GetWords(text: string): RangedWord[] {
        var out = new Array<RangedWord>();
        var level = 0;
        var startindex = 0;
        var Instring = false;

        for (var index = 0; index < text.length; index++) {
            var c = text.charAt(index);

            if (Instring) {
                if (c == '"')
                    Instring = false;
            }
            else {
                switch (c) {
                    case '"':
                        Instring = true;
                        break;

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
                        if (level == 0) {
                            if (startindex < index) {
                                var RW = new RangedWord(text.substring(startindex, index).trim(), startindex, index);
                                out.push(RW);
                            }

                            startindex = index + 1;
                        }

                        break;
                    default:
                        break;
                }
            }

            if (level < 0)
                break;
        }

        if (startindex < text.length) {
            var RW = new RangedWord(text.substring(startindex, text.length), startindex, text.length);
            out.push(RW);
        }

        return out;
    }

    //Converts the given text range into words
    static GetWordsFromRange(text: string, endindex: number): RangedWord[] {
        var out = new Array<RangedWord>();
        var level = 0;
        var startindex = 0;

        for (var index = 0; index < endindex; index++) {
            var c = text.charAt(index);

            switch (c) {
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
                    if (level == 0) {
                        if (startindex < index) {
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

        if (startindex < endindex) {
            var RW = new RangedWord(text.substring(startindex, endindex), startindex, endindex);
            out.push(RW);
        }

        return out;
    }

    //Gets the word that surrounds cursor
    static GetWord(text: string, position: number): RangedWord {
        var StartIndex = position;
        var C = text.charAt(StartIndex);

        while (C != ' ' && StartIndex > 0) {
            StartIndex--;
            C = text.charAt(StartIndex);
        }

        StartIndex++;

        var EndIndex = text.indexOf(' ', StartIndex);

        if (EndIndex < 0) {
            EndIndex = text.length;
        }

        return new RangedWord(text.substring(StartIndex, EndIndex), StartIndex, EndIndex);
    }
}