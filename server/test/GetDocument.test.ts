import { expect } from 'chai';
import path from 'path'
import { GetDocument } from '../src/Lib/Types/Document/include';

//THis is made to test FS systems where the plugin will run on
describe("GetDocument", ()=>{
	it("test", ()=>{
		const filepath = path.join(__dirname, "files", "example.entity.json");

		const doc = GetDocument(filepath);

		expect(doc, filepath).to.not.be.undefined;
	});

	it("getText", ()=>{
		const filepath = path.join(__dirname, "files", "example.entity.json");

		const doc = GetDocument(filepath);

		expect(doc, filepath).to.not.be.undefined;
		if (!doc) return;

		const text = doc.getText();
		expect(text.length).to.be.greaterThan(0, "expected content to the text");
	})
})