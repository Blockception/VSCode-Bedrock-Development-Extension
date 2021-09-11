export interface DataCollectorIO<T> {
  /**
   * Removes any data from the associated file
   * @param uri The filepath uri used
   */
 .deleteFile(uri: string): void;

  /**
   * Delete all files with given folder
   * @param uri The folder uri to delete
   */
  DeleteFolder(uri: string): void;

  /**
   * Clear all data;
   */
  Clear(): void;

  /**
   *
   * @param uri
   * @param call
   */
  ForEachFile(uri: string, call: (item: T) => void): void;
}

export namespace DataCollectorIO {
  export function is<T>(value: any): value is DataCollectorIO<T> {
    if (value.deleteFile && value.DeleteFolder && value.Clear) {
      return true;
    }

    return false;
  }
}
