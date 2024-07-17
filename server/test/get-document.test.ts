import path from "path";
import { GetDocument } from "../src/lib/lsp/documents/document";

//THis is made to test FS systems where the plugin will run on
describe("GetDocument", () => {
  const filepath = path.join(__dirname, "files", "example.entity.json");
  const doc = GetDocument(filepath);

  test("getText", () => {
    expect(doc).toBeDefined;

    const text = doc!.getText();
    expect(text.length).toBeGreaterThan(0);
  });
});
