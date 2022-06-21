import { OffsetWord } from 'bc-vscode-words';
import { expect } from 'chai';
import { Offset } from './Offset';


describe("Offset", ()=>{
    it("IsWithin", ()=>{
        const word = new OffsetWord("test", 0);
        expect(word.text).to.equal("test")
        expect(word.offset).to.equal(0);

        const test = (value : number, actual : boolean) => {
            expect(Offset.IsWithin(word, value), `${value}`).to.equal(actual);
        }

        test(0, true);
        test(1, true);
        test(2, true);
        test(3, true);
        
        test(4, false);
        test(5, false);
        test(6, false);
        test(7, false);
    });
})