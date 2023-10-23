class AppError {
  public readonly message: string; // mensagem de erro
  public readonly statusCode: number; // codigo do erro

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
