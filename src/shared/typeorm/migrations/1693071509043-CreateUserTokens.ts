import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTokens1693071509043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'user_tokens',
          columns : [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: "uuid",
              default: 'uuid_generate_v4()',
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: "uuid",
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',// chave estrangeira que comunica com a tabela users
              type: 'uuid',
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              default: 'now()'
            },
          ],
          foreignKeys: [
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',// efeito cascata caso seja deletado o user, deletao token dele aqui
              onUpdate: 'CASCADE',// AQUI o que foi atualizado, replica
            }
          ]
        })
      );
      }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens');
    }

}
