/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.-auth.guard';

@Controller('books')
export class BooksController {

    //Injectamos el servicio dentro del controlador
    constructor(private readonly bookService: BooksService) {}

/*     //Endpoint para listar todos los libros de la base de datos
    @Get()
    findAll(): Promise<Book[]> {
      return this.bookService.findAll();
    } */

    //Endpoint para filtrar y retornar todos los libros que cumplan con esas características {title, author, isReserved}
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllFilter(@Query('title') title?: string, @Query('author') author?: string, @Query('isReserved') isReserved?: boolean): Promise<Book[]> {
      const isReservedBool = isReserved !== undefined ? isReserved === true : undefined;
      return this.bookService.findAllFilter(title, author, isReservedBool);
   }
  
    //EndPoint para obtener de la lista de libros, uno solo según el id enviado
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Book> {
      return this.bookService.findOne(id);
    }
  
    //EndPoint para crear un nuevo libro
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() book: Book): Promise<Book> {
      return this.bookService.create(book);
    }
  
    //EndPoint para actualizar un libro existente buscándolo por ID
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() book: Book): Promise<void> {
      return this.bookService.update(id, book);
    }
  
    //EndPoint para eliminar un libro existente buscándolo por ID
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
      return this.bookService.remove(id);
    }
}
