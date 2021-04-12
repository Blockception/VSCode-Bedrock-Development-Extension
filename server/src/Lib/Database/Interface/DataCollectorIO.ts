export interface DataCollectorIO {
  /**
   * Removes any data from the associated file
   * @param uri The filepath uri used
   */
  DeleteFile(uri: string): void;

  /**
   * Delete all files with given folder
   * @param uri The folder uri to delete
   */
  DeleteFolder(uri: string): void;

  /**
   * Clear all data;
   */
  Clear(): void;
}

export namespace DataCollectorIO {
  export function is(value: any): value is DataCollectorIO {
    if (value.DeleteFile && value.DeleteFolder && value.Clear) {
      return true;
    }

    return false;
  }
}
