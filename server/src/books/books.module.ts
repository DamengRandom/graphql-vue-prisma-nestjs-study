import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BooksAuthorResolver } from './books-author.resolver';
import { AuthorModule } from '../authors/authors.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [AuthorModule],
  providers: [BooksResolver, BooksService, BooksAuthorResolver, PrismaService],
})
export class BooksModule {}
