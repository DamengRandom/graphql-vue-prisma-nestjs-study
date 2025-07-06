import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Prisma } from '@prisma/client';

@Resolver('Book') // we could treat this resolve file as a book controller
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation('createBook')
  create(@Args('createBookInput') createBookInput: Prisma.BookCreateInput) {
    return this.booksService.create(createBookInput);
  }

  @Query('books')
  findAll() {
    return this.booksService.findAll();
  }
}
