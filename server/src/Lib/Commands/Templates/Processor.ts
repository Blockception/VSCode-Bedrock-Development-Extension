import { SafeIDNoNamespace } from "./Functions";
const { v4: uuid } = require("uuid");

/**
 *
 */
export class TemplateProcessor {
  private data: { [key: string]: string };

  /**
   *
   * @param data
   */
  constructor(data: { [key: string]: string } | undefined) {
    this.data = data ?? {};
  }

  /**
   *
   * @param data
   * @returns
   */
  process(data: string): string {
    return data.replace(/(?:\${{)(.*)(?:}})/gim, this.replace);
  }

  /**
   *
   * @param data
   * @returns
   */
  replace(data: string): string {
    data = data.trim();

    const item = this.getValue(data);

    if (item) return item;

    switch (data) {
      case "safeid":
        return SafeIDNoNamespace(this.getValue("id") ?? "");

      case "uuid":
        return uuid();
    }

    return "";
  }

  /**
   *
   * @param key
   * @returns
   */
  getValue(key: string): string | undefined {
    return this.data[key];
  }
}
