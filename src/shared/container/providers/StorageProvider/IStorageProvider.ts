interface IStorageProvider {
  save(file: string, folders: string): Promise<string>;
  delete(file: string, folders: string): Promise<void>;
}
export { IStorageProvider };
