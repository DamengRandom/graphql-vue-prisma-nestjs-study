import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';
import { AuthorsService } from '../authors/authors.service';
import { Prisma } from '@prisma/client';

@Resolver('Book') // we could treat this resolve file as a author controller
export class BooksAuthorResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query('authors')
  getAuthors() {
    return this.authorsService.findAll();
  }

  @Mutation('createAuthor')
  async create(@Args('createAuthorInput') args: Prisma.AuthorCreateInput) {
    return this.authorsService.create(args);
  }

  @ResolveProperty()
  async author(@Parent() book) {
    return this.authorsService.findById(book?.authorId);
  }
}
