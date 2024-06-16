/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@ApiBearerAuth()
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
    @ApiOperation({ summary: 'Obtener todos los libros' })
    @ApiResponse({ status: 200, description: 'Lista de libros obtenida correctamente.' })
    @ApiQuery({ name: 'title', required: false, description: 'Filtrar por título' })
    @ApiQuery({ name: 'author', required: false, description: 'Filtrar por autor' })
    @ApiQuery({ name: 'isReserved', required: false, description: 'Filtrar por estado de reserva' })
    findAllFilter(@Query('title') title?: string, @Query('author') author?: string, @Query('isReserved') isReserved?: boolean): Promise<Book[]> {
      const isReservedBool = isReserved !== undefined ? isReserved === true : undefined;
      return this.bookService.findAllFilter(title, author, isReservedBool);
   }
  
    //EndPoint para obtener de la lista de libros, uno solo según el id enviado
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un libro por ID' })
    @ApiResponse({ status: 200, description: 'Libro obtenido correctamente.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    findOne(@Param('id') id: number): Promise<Book> {
      return this.bookService.findOne(id);
    }
  
    //EndPoint para crear un nuevo libro
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo libro' })
    @ApiResponse({ status: 201, description: 'Libro creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    create(@Body() book: Book): Promise<Book> {
      return this.bookService.create(book);
    }
  
    //EndPoint para actualizar un libro existente buscándolo por ID
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un libro existente' })
    @ApiResponse({ status: 204, description: 'Libro actualizado correctamente.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    update(@Param('id') id: number, @Body() book: Book): Promise<void> {
      return this.bookService.update(id, book);
    }
  
    //EndPoint para eliminar un libro existente buscándolo por ID
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un libro' })
    @ApiResponse({ status: 204, description: 'Libro eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    remove(@Param('id') id: number): Promise<void> {
      return this.bookService.remove(id);
    }
}
