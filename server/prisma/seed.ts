// import { PrismaClient } from '../generated/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  // See data to MondoDB

  const authorCreator = await prisma.author.create({
    data: {
      name: 'celia-test1',
      gender: 1,
      email: 'celia@test.co',
      books: {
        createMany: {
          data: [
            {
              name: 'book 3',
              type: 'fiction',
            },
            {
              name: 'book 4',
              type: 'classic',
            },
          ],
        },
      },
    },
  });

  const authorCreatorTwo = await prisma.author.create({
    data: {
      name: 'x-test1',
      gender: 2,
      email: 'x@testx.cox',
      books: {
        createMany: {
          data: [
            {
              name: 'book 5',
              type: 'fiction',
            },
          ],
        },
      },
    },
  });

  await Promise.all([authorCreator, authorCreatorTwo]);

  // const results = await prisma.book.findMany({
  //   include: {
  //     author: true, // this powerful because we are allowed to directly call its related data just one line command !!
  //   },
  // });
  // console.log('The book find results are: ', JSON.stringify(results));
}

main()
  .then(async (data) => {
    console.log(data);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
