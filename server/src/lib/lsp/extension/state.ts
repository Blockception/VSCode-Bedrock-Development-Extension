export interface State {
  workspaces: {
    traversed: boolean;
  };
}

export namespace State {
  export function empty(): State {
    return {
      workspaces: {
        traversed: false,
      },
    };
  }
}
