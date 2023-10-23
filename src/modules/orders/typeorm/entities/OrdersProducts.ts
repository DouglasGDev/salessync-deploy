import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";
import Product from "@modules/products/typeorm/entities/Product";


@Entity('orders_products')  // a entide comunica direto com a tabela orders_products do db
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products ) // o tipo de cardialidade que faz com o order
  @JoinColumn({name: 'order_id'}) // e qual a coluna que faz a ligação da referencia
  order: Order;

  @ManyToOne(() => Product, product => product.order_products) // o tipo de cardialidade que faz com o order
  @JoinColumn({name: 'product_id'}) // e qual a coluna que faz a ligação da referencia
  product: Product;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
