// è para definir a configuração de email utilizada na api, tem 2, o fake e-mail e o da amazon ses

interface IMailConfig {
  driver: `ethereal` | `ses`;
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contato@salessync.com.br',
      name: 'SalesSync',
    }
  }
} as IMailConfig;
