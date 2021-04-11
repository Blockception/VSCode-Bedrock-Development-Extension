import { inflateRaw } from "zlib";
import { FormatVersion } from "../../Interfaces/include";

export interface RenderController extends FormatVersion {
  render_controllers: object;
}

export namespace RenderController {
  export function is(value: any): value is RenderController {
    if (value && value.format_version && value.render_controllers) return true;

    return false;
  }
}
