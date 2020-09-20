import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'int' })
  seatings: number;
}

