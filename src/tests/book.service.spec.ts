/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity'; 
import { BooksService } from '../books/books.service'; 
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Función de fábrica para crear un mock del repositorio de libros.
const mockBookRepository = () => ({
  findOne: jest.fn(),  // Mock para el método findOne del repositorio.
  createQueryBuilder: jest.fn(() => ({  // Mock para createQueryBuilder que devuelve un objeto mock.
    andWhere: jest.fn().mockReturnThis(),  // Mock para andWhere que devuelve el objeto mismo.
    getMany: jest.fn().mockResolvedValue([]),  // Mock para getMany que devuelve una promesa vacía.
  })),
  save: jest.fn(),  // Mock para el método save del repositorio.
  update: jest.fn(),  // Mock para el método update del repositorio.
  delete: jest.fn(),  // Mock para el método delete del repositorio.
});

// Describe el conjunto de pruebas para el servicio BooksService.
describe('BooksService', () => {
  let service: BooksService;  // Variable para almacenar la instancia del servicio.
  let repository: Repository<Book>;  // Variable para almacenar el repositorio de libros.
  // Configuración que se ejecuta antes de cada prueba.
  beforeEach(async () => {
    // Crea un módulo de prueba de NestJS.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,  // Proveedor del servicio BooksService.
        {
          provide: getRepositoryToken(Book),  // Proveedor del token del repositorio para la entidad Book.
          useFactory: mockBookRepository,  // Usa la función de fábrica para el repositorio mock.
        },
      ],
    }).compile();  // Compila el módulo de prueba.
    service = module.get<BooksService>(BooksService);  // Obtiene la instancia del servicio BooksService.
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));  // Obtiene el repositorio de libros.
  });

  // Prueba para verificar que el servicio esté definido correctamente.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Describe las pruebas para el método findAllFilter del servicio.
  describe('findAllFilter', () => {
    // Prueba para verificar que findAllFilter devuelva un array de libros.
    it('should return an array of books', async () => {
      const result = [new Book()];  // Resultado esperado: un array con un libro.
      const queryBuilder = repository.createQueryBuilder('book');  // Crea un query builder para la entidad Book.
      jest.spyOn(queryBuilder, 'getMany').mockResolvedValue(result);  // Espía y devuelve el resultado esperado.
      // Asigna explícitamente el mock al método createQueryBuilder.
      (repository.createQueryBuilder as jest.Mock).mockReturnValue(queryBuilder);
      expect(await service.findAllFilter('test', 'test', true)).toEqual(result);  // Verifica la respuesta del servicio.
    });
  });

  // Describe las pruebas para el método findOne del servicio.
  describe('findOne', () => {
    // Prueba para verificar que findOne devuelva un libro único.
    it('should return a single book', async () => {
      const book = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(repository, 'findOne').mockResolvedValue(book);  // Espía y devuelve el libro creado.
      expect(await service.findOne(1)).toBe(book);  // Verifica que el método retorne el libro esperado.
    });

    // Prueba para verificar que findOne lance una NotFoundException si no se encuentra ningún libro.
    it('should throw a NotFoundException if no book is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);  // Simula que no se encontró ningún libro.

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción adecuada.
    });
  });

  // Describe las pruebas para el método create del servicio.
  describe('create', () => {
    // Prueba para verificar que create cree un nuevo libro.
    it('should create a new book', async () => {
      const book = { title: 'Test Title', author: 'Test Author' } as Book;  // Objeto de prueba tipo Book.
      jest.spyOn(repository, 'save').mockResolvedValue(book);  // Espía y devuelve el libro creado.
      expect(await service.create(book)).toBe(book);  // Verifica que el método retorne el libro creado.
    });
    // Prueba para verificar que create lance una BadRequestException si falta el título o el autor.
    it('should throw a BadRequestException if title or author is missing', async () => {
      const bookWithoutTitle = { title: '', author: 'Test Author' } as Book;  // Libro sin título.
      const bookWithoutAuthor = { title: 'Test Title', author: '' } as Book;  // Libro sin autor.
      const bookWithoutBoth = { title: '', author: '' } as Book;  // Libro sin título ni autor.
      // Verifica que se lance BadRequestException para cada caso.
      await expect(service.create(bookWithoutTitle)).rejects.toThrow(BadRequestException);
      await expect(service.create(bookWithoutAuthor)).rejects.toThrow(BadRequestException);
      await expect(service.create(bookWithoutBoth)).rejects.toThrow(BadRequestException);
    });
  });

  // Describe las pruebas para el método update del servicio.
  describe('update', () => {
    // Prueba para verificar que update actualice un libro.
    it('should update a book', async () => {
      const book = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(service, 'findOne').mockResolvedValue(book);  // Espía y devuelve el libro creado.
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);  // Espía y devuelve una actualización exitosa.
      await expect(service.update(1, book)).resolves.not.toThrow();  // Verifica que la actualización no lance excepciones.
    });
    // Prueba para verificar que update lance una NotFoundException si no se encuentra ningún libro.
    it('should throw a NotFoundException if no book is found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());  // Simula que no se encontró ningún libro.
      await expect(service.update(1, new Book())).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción adecuada.
    });
  });

  // Describe las pruebas para el método remove del servicio.
  describe('remove', () => {
    // Prueba para verificar que remove elimine un libro.
    it('should remove a book', async () => {
      const book = new Book();  // Crea un nuevo objeto de tipo Book.
      jest.spyOn(service, 'findOne').mockResolvedValue(book);  // Espía y devuelve el libro creado.
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);  // Espía y devuelve una eliminación exitosa.
      await expect(service.remove(1)).resolves.not.toThrow();  // Verifica que la eliminación no lance excepciones.
    });

    // Prueba para verificar que remove lance una NotFoundException si no se encuentra ningún libro.
    it('should throw a NotFoundException if no book is found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());  // Simula que no se encontró ningún libro.
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);  // Verifica que se lance la excepción adecuada.
    });
  });
});
