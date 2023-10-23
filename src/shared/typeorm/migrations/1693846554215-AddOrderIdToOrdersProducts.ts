import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1693846554215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn(
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
            generationStrategy: "uuid",
          }),
          );
          await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
              name: 'OrdersProductsOrder',
              columnNames: ['order_id'],
              referencedTableName: 'orders',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL', // aqui caso o customer for deletado, ele define os campos referenciado com null
            })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');// aqui deleta a fk referenciada que está na tabela orders_products
      await queryRunner.dropColumn('orders_products','order_id');// aqui deleta a coluna referencia que está em orders_products
    }

}
