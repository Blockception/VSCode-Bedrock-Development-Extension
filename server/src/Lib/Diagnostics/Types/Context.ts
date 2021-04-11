import { ProjectData } from "../../Code/include";
import { ValidationData } from "../../Validation/include";

export interface DiagnoseContext {
  projectStructure: ProjectData;
  data: ValidationData;
}
