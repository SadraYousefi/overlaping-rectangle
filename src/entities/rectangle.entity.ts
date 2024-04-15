
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity()
export class Rectangle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @CreateDateColumn({type: "timestamp"})
  time: Date ;

  constructor(rectangle: Partial<Rectangle>) {
    Object.assign(this , rectangle)
  }
}
