/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

//Entidad Book y sus atributos
@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID único del libro' })
    id: number;
  
    @Column()
    @ApiProperty({ example: 'Introducción a la Programación', description: 'Título del libro' })
    title: string;
  
    @Column()
    @ApiProperty({ example: 'Juan Perez', description: 'Autor del libro' })
    author: string;
  
    @Column()
    @ApiProperty({ example: '1968', description: 'Año de publicación del libro' })
    publishedYear: number;
  
    @Column()
    @ApiProperty({ example: 'comedia', description: 'Genero del libro' })
    genre: string;
  
    @Column()
    @ApiProperty({ example: false, description: 'Indica si el libro está reservado' })
    isReserved: boolean;
}