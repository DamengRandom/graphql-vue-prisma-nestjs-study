# Vue GraphQL Prisma NestJS Study

## How to run project

```sh
# Step 0:
# Please ensure you have a .env file `DATABASE_URL=MONGO_URL` setup 

# For server start:
cd server
npm run dev

# For client start:
cd client
npm run dev
```

## Prisma

Its an ORM

```sh
"prisma:generate": "npx prisma generate --watch" # keep watching model changes
"prisma:format": "npx prisma format" # format prisma schema (make it pretty)
```

### Prisma CLIs

```sh
# When we see the configuration inside pacakage.json file, we know we can seed some data
"prisma": {
    "seed": "ts-node prisma/seed.ts"
},

# Comamnd will be
npx prisma db seed
# Actually its same like `npx ts-node prisma-client.ts` which also used for mocking/seeding some data for db

# Purpose: data initilization
```

```sh
npx prisma db push # used for updating db schema !!!
```
