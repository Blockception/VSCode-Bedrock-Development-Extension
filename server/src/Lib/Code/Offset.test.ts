import { OffsetWord } from 'bc-vscode-words';
import { expect } from 'chai';
import { Offset } from './Offset';


describe("Offset", ()=>{
    it("IsWithin", ()=>{
        let word = new OffsetWord("test", 0);
        expect(Offset.IsWithin(word, 0)).to.equal(true);
        expect(Offset.IsWithin(word, 1)).to.equal(true);
        expect(Offset.IsWithin(word, 2)).to.equal(true);
        expect(Offset.IsWithin(word, 3)).to.equal(true);
        
        expect(Offset.IsWithin(word, 4)).to.equal(false);
        expect(Offset.IsWithin(word, 5)).to.equal(false);
        expect(Offset.IsWithin(word, 6)).to.equal(false);
        expect(Offset.IsWithin(word, 7)).to.equal(false);
    });
})