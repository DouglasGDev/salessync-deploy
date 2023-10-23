import crypto from "crypto";
import multer, {StorageEngine} from "multer";
import path from "path";

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads' ); // dirname é o diretório atual e os .. volta un nivel e por ultimo a pasta que quer deixar
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp' );// diretorio temporário, que vai servir pro arquivo ficar temporário e depois ser movido para ou aws s3 ou disco local

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder, // diretorio definido
  tmpFolder,
  multer: {
    storage: multer.diskStorage({ // aqui vai mexer com upload de fotos, arquivos o multer
      destination: tmpFolder, // para onde vai o upload
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex'); //aqui vai criar uma hash para o nome da foto upada, para não haver fotos com o mesmo nome.

        const filename = `${fileHash}-${file.originalname}`; // aqui pega o nome da hash e concatena com o nome original da foto upada, assim cria-se nome de arquivo único

        callback(null, filename);
      },
    }),
  },
  config: {
    //disk: {},
    aws: {
      bucket: 'salessync-bucket',

    },
  },
} as IUploadConfig;
