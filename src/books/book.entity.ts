/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";


//Entidad Book y sus atributos
@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    author: string;
  
    @Column()
    publishedYear: number;
  
    @Column()
    genre: string;
  
    @Column()
    isReserved: boolean;
}