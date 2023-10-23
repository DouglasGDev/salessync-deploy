import fs  from "fs";
import path from "path";
import aws, {S3} from 'aws-sdk'; // o s3 é para o armazanenamento em cloud, ele é tratado como um tipo de tipagem e a aws é para fazer a conexão com a api da aws
import uploadConfig from '@config/upload';
import mime from 'mime'; // serve para ver que tipo de arquivo é

// Provedor de armazenamento em disco em nuvem na aplicação
export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }
  public async saveFile(file: string) : Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);// ele pega o diretorio temp com o nome do arquivo

    const ContentType = mime.getType(originalPath);// pega o diretorio do arquivo e o arquivo especifico vai ser analisado o tipo que ele é

    if(!ContentType){
      throw new Error('Arquivo não encontrado');// se não houver arquivo ele retorna esse erro
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,// é o nome do arquivo que vai para o db do s3 da amazon
      ACL: 'public-read',// O TIPO DE PERMISSÃO ATRIBUIDA PRO ARQUIVO UPADO
      Body: fileContent,// onde está o conteudo do arquivo
      ContentType, // o tipo de arquivo
    }).promise()// por causa que é ainda callback e com o promisse consegue usar o await como callback;

    await fs.promises.unlink(originalPath);// aqui ele vai apagar o arquivo do temp, pq ja foi upado para a amazon s3

    return file;
  }

  public async deleteFile(file: string) : Promise<void> {

  await this.client.deleteObject({
    Bucket: uploadConfig.config.aws.bucket,
    Key: file,
  }).promise();
  }
}
