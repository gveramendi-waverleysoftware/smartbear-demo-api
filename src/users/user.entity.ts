import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('first_name')
  firstName: string;

  @Column('last_name')
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
