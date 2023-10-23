import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';

@Entity('users')  // a entide comunica direto com a tabela users do db
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()// para não trazer a senha junto no corpo da requisição da api.
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({name: 'avatar_url'})// campo "virtual" para alocar informações do foto de perfil do avatar, link que abre na web
  getAvatarUrl(): string | null {
    if(!this.avatar){
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`// aqui é para retornar o link da foto de avatar no json
  }
}

export default User;
