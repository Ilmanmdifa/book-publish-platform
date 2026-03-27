import { prisma } from "../config/db.js";

const getAllBooks = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Filtering
    const { authorId, publisherId, search } = req.query;

    // Sorting
    const sortBy = req.query.sortBy || "title";
    const order = req.query.order === "desc" ? "desc" : "asc";

    // Build filter object
    const where = {
      ...(authorId && { authorId }),
      ...(publisherId && { publisherId }),
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    // Query
    const books = await prisma.book.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
      include: {
        author: true,
        publisher: true,
      },
    });

    const total = await prisma.book.count({ where });

    return res.status(200).json({
      status: "success",
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error: "Internal server error",
    });
  }
};

const getBook = async (req, res) => {
  const book = await prisma.book.findUnique({
    where: { id: req.params.id },
  });

  if (!book) {
    return res.status(404).json({ status: "error", error: "Book not found" });
  }

  return res.status(200).json({ status: "success", data: book });
};

const createBook = async (req, res) => {
  let { title, authorId, publisherId, releaseYear } = req.body;

  releaseYear = Number(releaseYear);

  if (
    !req.body.title ||
    !req.body.authorId ||
    !req.body.publisherId ||
    !req.body.releaseYear
  ) {
    return res
      .status(400)
      .json({ status: "error", error: "All fields are required" });
  }

  // check if publisher already added
  const bookItem = await prisma.book.create({
    data: { title, authorId, publisherId, releaseYear },
  });

  return res.status(201).json({ status: "success", data: bookItem });
};

const updateBook = async (req, res) => {
  let { title, authorId, publisherId, releaseYear } = req.body;

  // Convert releaseYear to a number
  releaseYear = Number(releaseYear);

  //Find book item
  const bookItem = await prisma.book.findUnique({
    where: { id: req.params.id },
  });

  if (!bookItem) {
    return res.status(404).json({ status: "error", error: "Book not found" });
  }

  // Build update data
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (authorId !== undefined) updateData.authorId = authorId;
  if (publisherId !== undefined) updateData.publisherId = publisherId;
  if (releaseYear !== undefined) updateData.releaseYear = releaseYear;

  const updatedItem = await prisma.book.update({
    where: { id: req.params.id },
    data: updateData,
  });

  return res.status(200).json({ status: "success", data: updatedItem });
};

const deleteBook = async (req, res) => {
  //Find book item
  const bookItem = await prisma.book.findUnique({
    where: { id: req.params.id },
  });

  if (!bookItem) {
    return res.status(404).json({ status: "error", error: "Book not found" });
  }

  await prisma.book.delete({ where: { id: req.params.id } });
  return res.status(200).json({ status: "success", message: "Book deleted" });
};

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
