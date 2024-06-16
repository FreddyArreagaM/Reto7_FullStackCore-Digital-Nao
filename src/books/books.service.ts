/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {

  //Injección de la clase Repository declarándola de tipo Book
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

/*   //Metodo para listar todos los libros de la base de datos
  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  } */

  //Método para mostrar todos los libros de la base de datos bajo ciertas características{title, auhor, isReserved}
  findAllFilter(title?: string, author?: string, isReserved?: boolean): Promise<Book[]> {
    const query = this.bookRepository.createQueryBuilder('book');
    // Validamos cual es el query enviado para filtrar la lista de libros en la base de datos.
    if (title) { query.andWhere('book.title LIKE :title', { title: `%${title}%` }); }
    if (author) { query.andWhere('book.author LIKE :author', { author: `%${author}%` }); }
    if (isReserved !== undefined) { query.andWhere('book.isReserved = :isReserved', { isReserved }); }
    //Retornamos la lista de libros que coinciden con dicho query.
    return query.getMany();
  }

  //Metodo obtener información de un libro por su ID
  async findOne(id: any): Promise<Book> {
    //Buscamos primero el libro para validar que exista.
    const book = await this.bookRepository.findOne({ where: { id } });
    //Si el libro no existe se envía una excepcion
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    //Caso contrario se retorna dicho libro al controlador.
    else{
      return book;
    }
  }
  
  //Método para crear un nuevo libro
  async create(book: Book): Promise<Book> {
    // Validamos que los valores de title y author sean enviados porque son requeridos
    if (!book.title || !book.author) {
      throw new BadRequestException('Title and author are required');
    }
    // Caso contrario se procede a guardar en la base de datos
    return await this.bookRepository.save(book);
  }

  //Método para actualizar un libro por medio de su ID
  async update(id: number, book: Book): Promise<void> {
    //Buscamos primero el libro para validar que exista.
    const existingBook = await this.findOne(id);
    //Si el libro no existe se envía una excepcion
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    //En caso de que si exista el libro con ese ID se actualiza 
    else{
      await this.bookRepository.update(id, book);
    }
  }

  //Método para eliminar un libro por medio de su ID
  async remove(id: number): Promise<void> {
    //Buscamos primero el libro para validar que exista.
    const book = await this.findOne(id);
    //Si el libro no existe se envía una excepcion
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    //En caso de que si exista el libro con ese ID se elimina
    else{
      await this.bookRepository.delete(id);
    }
  }
}
