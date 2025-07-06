import { MinLength } from 'class-validator';
import { CreateBookInput } from '../../graphql';

export class CreateBookDto extends CreateBookInput {
  @MinLength(1)
  declare name: string;
}
