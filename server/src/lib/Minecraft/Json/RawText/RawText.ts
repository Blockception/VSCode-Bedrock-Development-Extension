export interface TextComponent {
  text: string;
}

export namespace TextComponent {
  export function is(value: any): value is TextComponent {
    if (value && value.text) {
      return true;
    }

    return false;
  }
}

export interface TranslateComponent {
  translate: string;
  with: string[] | RawText | undefined;
}

export namespace TranslateComponent {
  export function is(value: any): value is TranslateComponent {
    if (value && value.translate) {
      return true;
    }

    return false;
  }
}

export interface SelectorComponent {
  selector: string;
}

export namespace SelectorComponent {
  export function is(value: any): value is SelectorComponent {
    if (value && value.selector) {
      return true;
    }

    return false;
  }
}

export interface ScoreComponent {
  score: {
    name: string;
    objective: string;
  };
}

export namespace ScoreComponent {
  export function is(value: any): value is ScoreComponent {
    if (value && value.score && value.score.name && value.score.objective) {
      return true;
    }

    return false;
  }
}

export type RawTextComponent = TextComponent | TranslateComponent | SelectorComponent | ScoreComponent;

export interface RawText {
  rawtext: RawTextComponent[];
}

export namespace RawText {
  export function is(value: any): value is RawText {
    if (value && value.rawtext) {
      return true;
    }

    return false;
  }
}
