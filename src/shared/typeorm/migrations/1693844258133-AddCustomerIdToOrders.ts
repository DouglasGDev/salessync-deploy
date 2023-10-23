import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1693844258133 implements MigrationInterface {
// essa migration é para criar o campo da chave estrangeira dentro da table orders, e ele está como nulo pq as vezes o cliente não existe mais
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn(
          {
            name: 'customer_id',
            type: 'uuid',
            isNullable: true,
            generationStrategy: "uuid",
          }),
          );
          await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
              name: 'OrdersCustomer',
              columnNames: ['customer_id'],
              referencedTableName: 'customers',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL', // aqui caso o customer for deletado, ele define os campos referenciado com null
            })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders', 'OrdersCustomer');// aqui deleta a fk referenciada que está na tabela orders
      await queryRunner.dropColumn('orders','customer_id');// aqui deleta a coluna referencia que está em orders
    }

}
