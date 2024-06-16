/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BooksController } from '../books/books.controller';
import { BooksService } from '../books/books.service';
import { Book } from '../books/book.entity';

// Función de fábrica para crear un mock del servicio BooksService.
const mockBookService = () => ({
  findAllFilter: jest.fn(),  // Mock para el método findAllFilter del servicio.
  findOne: jest.fn(),  // Mock para el método findOne del servicio.
  create: jest.fn(),  // Mock para el método create del servicio.
  update: jest.fn(),  // Mock para el método update del servicio.
  remove: jest.fn(),  // Mock para el método remove del servicio.
});

// Describe el conjunto de pruebas para el controlador BooksController.
describe('BookController', () => {
  let controller: BooksController;  // Variable para almacenar la instancia del controlador.
  let service: BooksService;  // Variable para almacenar el servicio BooksService.

  // Configuración que se ejecuta antes de cada prueba.
  beforeEach(async () => {
    // Crea un módulo de prueba de NestJS.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],  // Especifica que se prueba el controlador BooksController.
      providers: [
        {
          provide: BooksService,  // Proveedor del servicio BooksService.
          useFactory: mockBookService,  // Usa la función de fábrica para el servicio mock.
        },
      ],
    }).compile();  // Compila el módulo de prueba.

    controller = module.get<BooksController>(BooksController);  // Obtiene la instancia del controlador BooksController.
    service = module.get<BooksService>(BooksService);  // Obtiene la instancia del servicio BooksService.
  });

  // Prueba para verificar que el controlador esté definido correctamente.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Describe las pruebas para el método findAllFilter del controlador.
  describe('findAllFilter', () => {
    // Prueba para verificar que findAllFilter devuelva un array de libros.
    it('should return an array of books', async () => {
      const result = [new Book()];  // Resultado esperado: un array con un libro.
      jest.spyOn(service, 'findAllFilter').mockResolvedValue(result);  // Espía y devuelve el resultado esperado.

      expect(await controller.findAllFilter()).toBe(result);  // Verifica la respuesta del controlador.
    });
  });

  // Describe las pruebas para el método findOne del controlador.
  describe('findOne', () => {
    // Prueba para verificar que findOne devuelva un libro único.
    it('should return a single book', async () => {
      const result = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(service, 'findOne').mockResolvedValue(result);  // Espía y devuelve el libro creado.

      expect(await controller.findOne(1)).toBe(result);  // Verifica que el método retorne el libro esperado.
    });

    // Prueba para verificar que findOne lance una NotFoundException si no se encuentra ningún libro.
    it('should throw an error if no book is found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Book not found'));  // Simula que no se encontró ningún libro.

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción adecuada.
    });
  });

  // Describe las pruebas para el método create del controlador.
  describe('create', () => {
    // Prueba para verificar que create cree un nuevo libro.
    it('should create a new book', async () => {
      const book = { title: 'Test Title', author: 'Test Author' } as Book;  // Objeto de prueba tipo Book.
      jest.spyOn(service, 'create').mockResolvedValue(book);  // Espía y devuelve el libro creado.

      expect(await controller.create(book)).toBe(book);  // Verifica que el método retorne el libro creado.
    });
  });

  // Describe las pruebas para el método update del controlador.
  describe('update', () => {
    // Prueba para verificar que update actualice un libro.
    it('should update a book', async () => {
      const book = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(service, 'update').mockResolvedValue(undefined);  // Espía y devuelve una actualización exitosa.
      jest.spyOn(service, 'findOne').mockResolvedValue(book);  // Espía y devuelve el libro creado.

      await expect(controller.update(1, book)).resolves.not.toThrow();  // Verifica que la actualización no lance excepciones.
    });
  });

  // Describe las pruebas para el método remove del controlador.
  describe('remove', () => {
    // Prueba para verificar que remove elimine un libro.
    it('should remove a book', async () => {
      const book = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(service, 'findOne').mockResolvedValue(book);  // Espía y devuelve el libro creado.
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);  // Espía y devuelve una eliminación exitosa.

      await expect(controller.remove(1)).resolves.not.toThrow();  // Verifica que la eliminación no lance excepciones.
    });
  });
});
