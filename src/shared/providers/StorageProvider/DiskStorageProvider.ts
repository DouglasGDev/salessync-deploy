import uploadConfig from "@config/upload";
import fs  from "fs";
import path from "path";

// Provedor de armazenamento em disco local na aplicação
export default class DiskStorageProvider {
  public async saveFile(file: string) : Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string) : Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath); // verifica o estato, se tem alguma foto, arquivo no filepath e se tiver ele muda do temp para o diretorio que foi atribuido
    }catch(err){
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
