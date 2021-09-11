import { LocationWord } from "bc-vscode-words";
import { expect } from "chai";
import { CreateMinecraftCommandWords } from "./Words";

describe("Commands Words", () => {
  it("relative coordinates", () => {
    var command = "execute @s ~~~ say hi";

    let Words = LocationWord.Text.Parse(command, "", CreateMinecraftCommandWords);

    expect(Words.length).to.equal(7);
    expect(Words[0].text).to.equal("execute");
    expect(Words[1].text).to.equal("@s");
    expect(Words[2].text).to.equal("~");
    expect(Words[3].text).to.equal("~");
    expect(Words[4].text).to.equal("~");
    expect(Words[5].text).to.equal("say");
    expect(Words[6].text).to.equal("hi");
  });

  it("local coordinates", () => {
    var command = "execute @s ^^^ say hi";

    let Words = LocationWord.Text.Parse(command, "", CreateMinecraftCommandWords);

    expect(Words.length).to.equal(7);
    expect(Words[0].text).to.equal("execute");
    expect(Words[1].text).to.equal("@s");
    expect(Words[2].text).to.equal("^");
    expect(Words[3].text).to.equal("^");
    expect(Words[4].text).to.equal("^");
    expect(Words[5].text).to.equal("say");
    expect(Words[6].text).to.equal("hi");
  });
});
