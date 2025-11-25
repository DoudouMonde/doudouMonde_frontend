export interface FileService {
  uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
  uploadFiles(files: Express.Multer.File[], folder: string): Promise<string[]>;
}
