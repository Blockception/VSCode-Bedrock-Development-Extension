import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { FunctionContext, TemplateFunctions } from "../functions";
import path from "path";

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

  test("Attribute should be able to return stuff", () => {
    expect(TestProcessor.getAttribute("id")).toEqual("kekw:id_test");
  });

  test("getPack should match", () => {
    expect(TestProcessor.getPack()).toBeUndefined;
  });

  test("getProject should be defined", () => {
    expect(TestProcessor.getProject).toBeUndefined;
  });

  //Filename should be 'test.json'
  test("Filename should be 'test.json'", () => {
    expect(TestProcessor.data.filename()).toEqual("test.json");
  });

  //Filepath should be '/entities/test.json'
  test("Filepath should be '/entities/test.json'", () => {
    expect(TestProcessor.data.filepath()).toEqual(path.sep + path.join("entities", "test.json"));
  });

  //Folder should be '/entities/'
  test("Folder should be '/entities/'", () => {
    expect(TestProcessor.data.folder()).toEqual(path.sep + "entities");
  });

  //ID should be 'kekw:id_test'
  test("ID should be 'kekw:id_test'", () => {
    expect(TestProcessor.data.id()).toEqual("kekw:id_test");
  });

  //Safe ID should be 'kekw_id_test'
  test("Safe ID should be 'kekw_id_test'", () => {
    expect(TestProcessor.data["id.safe"]()).toEqual("kekw_id_test");
  });

  //Safe ID should be 'kekw_id_test'
  test("Safe ID should be 'kekw_id_test'", () => {
    expect(TestProcessor.data["id.safe.nonamespace"]()).toEqual("id_test");
  });

  //Pack should be '/test/bp'
  test("Pack should be '/test/bp'", () => {
    expect(TestProcessor.data.pack()).toEqual("bp");
  });

  //Pack.type should be 'behavior'
  test("Pack.type should be 'behavior'", () => {
    expect(TestProcessor.data["pack.type"]()).toEqual("behavior");
  });

  //Pack.type.short should be 'bp'
  test("Pack.type.short should be 'bp'", () => {
    expect(TestProcessor.data["pack.type.short"]()).toEqual("bp");
  });

  //TemplateID should be 'behavior.test'
  test("TemplateID should be 'behavior.test'", () => {
    expect(TestProcessor.data["template.id"]()).toEqual("behavior.test");
  });

  //Tool should be 'blockception-minecraft-bedrock'
  test("Tool should be 'blockception-minecraft-bedrock'", () => {
    expect(TestProcessor.data.tool()).toEqual("blockception-minecraft-bedrock");
  });

  test("Replace test", () => {
    const template = " ${{id}} ${{id}} ${{id.safe.nonamespace}} ${{id}}";
    const result = TestProcessor.process(template);

    expect(result).toEqual(" kekw:id_test kekw:id_test id_test kekw:id_test");
  });

  test("Attribute Replace test", () => {
    const template =
      " ${{project.attributes:pack_format}} ${{project.attributes:description}} ${{project.attributes:namespace}}";
    const result = TestProcessor.process(template);

    expect(result).toEqual(" 7 Test blockception");
  });
});
