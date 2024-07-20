

export interface ExtensionCapabilities {
  completion: boolean
}


export class ExtensionContext {
  public context: ExtensionCapabilities

  constructor() {
    this.context = {
      completion: false,
    }
  }
}