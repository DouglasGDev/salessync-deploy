import  handlebars  from 'handlebars';// para criar o template do email enviado
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number; // aqui foi criado para receber variáveis dinamicas, varios tipos
}

interface IParseMailTemplate { // essa interface é para definir o parse abaixo, ou seja, o parse é responsável por transmitir o html, a estrutura
  file: string;
  variables:  ITemplateVariable;
}
export default class HandlebarsMailTemplate {
  public async parse({ // parsiado é tranformado
    file,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent =await fs.promises.readFile(file, { // aqui ele vai ler o arquivo pre-configurado
      encoding: 'utf-8' // o tipo de encoder
    });
    const parseTemplate = handlebars.compile(templateFileContent); // aqui ele compila o template

    return parseTemplate(variables); // aqui ele considera as varaveis tbm
  }
}
