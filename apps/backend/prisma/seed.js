import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);
  // Users
  console.log("Seeding users...");
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  console.log("Seeding authors...");
  // Authors
  const rowling = await prisma.author.create({
    data: { name: "J.K. Rowling" },
  });
  const martin = await prisma.author.create({
    data: { name: "George R.R. Martin" },
  });
  const tolkien = await prisma.author.create({
    data: { name: "J.R.R. Tolkien" },
  });

  console.log("Seeding publishers...");
  // Publishers
  const bloomsbury = await prisma.publisher.create({
    data: { name: "Bloomsbury" },
  });
  const bantam = await prisma.publisher.create({
    data: { name: "Bantam Books" },
  });
  const harper = await prisma.publisher.create({
    data: { name: "HarperCollins" },
  });

  console.log("Seeding books...");
  // Books
  const books = [
    {
      title: "Harry Potter and the Philosopher's Stone",
      authorId: rowling.id,
      publisherId: bloomsbury.id,
      releaseYear: 1997,
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      authorId: rowling.id,
      publisherId: bloomsbury.id,
      releaseYear: 1998,
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      authorId: rowling.id,
      publisherId: bloomsbury.id,
      releaseYear: 1999,
    },
    {
      title: "A Game of Thrones",
      authorId: martin.id,
      publisherId: bantam.id,
      releaseYear: 1996,
    },
    {
      title: "A Clash of Kings",
      authorId: martin.id,
      publisherId: bantam.id,
      releaseYear: 1998,
    },
    {
      title: "A Storm of Swords",
      authorId: martin.id,
      publisherId: bantam.id,
      releaseYear: 2000,
    },
    {
      title: "The Hobbit",
      authorId: tolkien.id,
      publisherId: harper.id,
      releaseYear: 1937,
    },
    {
      title: "The Fellowship of the Ring",
      authorId: tolkien.id,
      publisherId: harper.id,
      releaseYear: 1954,
    },
    {
      title: "The Two Towers",
      authorId: tolkien.id,
      publisherId: harper.id,
      releaseYear: 1954,
    },
    {
      title: "The Return of the King",
      authorId: tolkien.id,
      publisherId: harper.id,
      releaseYear: 1955,
    },
  ];

  for (const book of books) {
    await prisma.book.create({ data: book });
    console.log(`📚 Created: ${book.title}`);
  }

  console.log("Seeding done!");
}

main()
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
