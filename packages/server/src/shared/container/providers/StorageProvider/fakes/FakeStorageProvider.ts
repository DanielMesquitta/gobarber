import { IStorageProvider } from '@shared/container/providers/StorageProvider/models';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const foundFileIndex = this.storage.findIndex(
      (storageFile) => storageFile === file
    );
    this.storage.splice(foundFileIndex, 1);
  }
}

export default FakeStorageProvider;
