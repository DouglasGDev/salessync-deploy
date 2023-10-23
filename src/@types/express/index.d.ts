declare namespace Express { // aqui é so para tipar o user para ser utilizado no middleware, para pegar o id do decoded jwt
  export interface Request {
    user: {
      id: string;
    };
  }
}
