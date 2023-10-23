import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1693847163142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn(
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
            generationStrategy: "uuid",
          }),
          );
          await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
              name: 'OrdersProductsProduct',
              columnNames: ['product_id'],
              referencedTableName: 'products',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL', // aqui caso o customer for deletado, ele define os campos referenciado com null
            })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('product_id', 'OrdersProductsProduct');// aqui deleta a fk referenciada que está na tabela products
      await queryRunner.dropColumn('orders_products','product_id');// aqui deleta a coluna referencia que está em orders_products
    }

}
