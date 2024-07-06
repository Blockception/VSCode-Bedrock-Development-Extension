import { BehaviorPack, PackType } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import path from "path";
import { FunctionContext, TemplateFunctions } from "../Functions";

const TestContext: FunctionContext = {
  filename: "test.json",
  folder: "entities",
  templateID: "behavior.test",
  pack: "bp",
  attributes: {
    id: "kekw:id_test",
  },
};

const TestProcessor = new TemplateFunctions(TestContext);

describe("TestProcessor", () => {
  TestProcessor.getPack = () => {
    const project = MCProject.createEmpty();
    project.attributes["pack_format"] = "7";
    project.attributes["description"] = "Test";
    project.attributes["namespace"] = "blockception";

    return new BehaviorPack.BehaviorPack("/test/bp", project);
  };

  it("Attribute should be able to return stuff", () => {
    expect(TestProcessor.getAttribute("id")).to.equal("kekw:id_test");
  });

  it("getPack should match", () => {
    expect(TestProcessor.getPack()).to.not.be.undefined;
  });

  it("getProject should be defined", () => {
    expect(TestProcessor.getProject).to.not.be.undefined;
  });

  //Filename should be 'test.json'
  it("Filename should be 'test.json'", () => {
    expect(TestProcessor.data.filename()).to.equal("test.json");
  });

  //Filepath should be '/entities/test.json'
  it("Filepath should be '/entities/test.json'", () => {
    expect(TestProcessor.data.filepath()).to.equal(path.sep + path.join("entities", "test.json"));
  });

  //Folder should be '/entities/'
  it("Folder should be '/entities/'", () => {
    expect(TestProcessor.data.folder()).to.equal(path.sep + "entities");
  });

  //ID should be 'kekw:id_test'
  it("ID should be 'kekw:id_test'", () => {
    expect(TestProcessor.data.id()).to.equal("kekw:id_test");
  });

  //Safe ID should be 'kekw_id_test'
  it("Safe ID should be 'kekw_id_test'", () => {
    expect(TestProcessor.data["id.safe"]()).to.equal("kekw_id_test");
  });

  //Safe ID should be 'kekw_id_test'
  it("Safe ID should be 'kekw_id_test'", () => {
    expect(TestProcessor.data["id.safe.nonamespace"]()).to.equal("id_test");
  });

  //Pack should be '/test/bp'
  it("Pack should be '/test/bp'", () => {
    expect(TestProcessor.data.pack()).to.equal("bp");
  });

  //Pack.type should be 'behavior'
  it("Pack.type should be 'behavior'", () => {
    expect(TestProcessor.data["pack.type"]()).to.equal("behavior");
  });

  //Pack.type.short should be 'bp'
  it("Pack.type.short should be 'bp'", () => {
    expect(TestProcessor.data["pack.type.short"]()).to.equal("bp");
  });

  //TemplateID should be 'behavior.test'
  it("TemplateID should be 'behavior.test'", () => {
    expect(TestProcessor.data["template.id"]()).to.equal("behavior.test");
  });

  //Tool should be 'blockception-minecraft-bedrock'
  it("Tool should be 'blockception-minecraft-bedrock'", () => {
    expect(TestProcessor.data.tool()).to.equal("blockception-minecraft-bedrock");
  });

  it("Replace test", () => {
    const template = " ${{id}} ${{id}} ${{id.safe.nonamespace}} ${{id}}";
    const result = TestProcessor.process(template);

    expect(result).to.equal(" kekw:id_test kekw:id_test id_test kekw:id_test");
  });

  it("Attribute Replace test", ()=>{
    const template = " ${{project.attributes:pack_format}} ${{project.attributes:description}} ${{project.attributes:namespace}}";
    const result = TestProcessor.process(template);

    expect(result).to.equal(" 7 Test blockception");
  })
});
