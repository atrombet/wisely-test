import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'int' })
  party_size: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;
}