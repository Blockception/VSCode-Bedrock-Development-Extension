import { expect } from 'chai'
import { Database } from './Database'

describe("Database",()=>{
  it("Sanity",()=>{
    expect(Database).to.not.be.undefined;

    expect(Database.Diagnoser).to.not.be.undefined;
    expect(Database.ProjectData).to.not.be.undefined;
    expect(Database.WorkspaceData).to.not.be.undefined;

    expect(Database.Diagnoser.context).to.not.be.undefined;
    expect(Database.ProjectData.Context).to.not.be.undefined;
  })
})