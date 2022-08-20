import { expect } from 'chai';
import path from 'path'
import { GetDocument } from '../src/Lib/Types/Document';

//THis is made to test FS systems where the plugin will run on
describe("GetDocument", ()=>{
	const filepath = path.join(__dirname, "files", "example.entity.json");
	const doc = GetDocument(filepath);

	it("test", ()=>{
		expect(doc, filepath).to.not.be.undefined;
	});

	it("getText", ()=>{
		if (doc === undefined) expect.fail("expected a document")

		const text = doc.getText();
		expect(text.length).to.be.greaterThan(0, "expected content to the text");
	})
})