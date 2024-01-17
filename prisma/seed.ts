import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.note.create({
    data: {
      title: "My first Note",
      content: "Hello, world!",
    },
  });

  await prisma.note.create({
    data: {
      title: "My second Note",
      content: "Hello, world!",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
