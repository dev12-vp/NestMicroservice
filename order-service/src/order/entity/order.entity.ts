import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ schema: "micro", name: "orders" })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('jsonb', { nullable: true })
    items: any[];

    @CreateDateColumn()
    createdAt: Date;
}
