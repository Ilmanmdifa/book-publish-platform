import { prisma } from "../config/db.js";

const getAllAuthor = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Filtering (example: by name exact match)
    const { name } = req.query;

    // Sorting
    const allowedSortFields = ["name", "createdAt"];
    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "name";

    const order = req.query.order === "desc" ? "desc" : "asc";

    // Filter
    const where = {
      ...(name && { name }),
    };

    const authors = await prisma.author.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });

    const total = await prisma.author.count({ where });

    return res.status(200).json({
      status: "success",
      data: authors,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

const getAuthor = async (req, res) => {
  const author = await prisma.author.findUnique({
    where: { id: req.params.id },
  });

  if (!author) {
    return res.status(404).json({ status: "error", error: "Author not found" });
  }

  return res.status(200).json({ status: "success", data: author });
};

const createAuthor = async (req, res) => {
  const { name } = req.body;

  if (!req.body.name) {
    return res.status(400).json({ status: "error", error: "Name is required" });
  }
  // check if author already added
  const authorItem = await prisma.author.create({
    data: { name },
  });

  return res.status(201).json({ status: "success", data: authorItem });
};

const updateAuthor = async (req, res) => {
  const { name } = req.body;
  //Find author item
  const authorItem = await prisma.author.findUnique({
    where: { id: req.params.id },
  });

  if (!authorItem) {
    return res.status(404).json({ status: "error", error: "Author not found" });
  }

  // Build update data
  const updateData = {};
  if (name !== undefined) updateData.name = name;

  const updatedItem = await prisma.author.update({
    where: { id: req.params.id },
    data: updateData,
  });

  return res.status(200).json({ status: "success", data: updatedItem });
};

const deleteAuthor = async (req, res) => {
  //Find author item
  const authorItem = await prisma.author.findUnique({
    where: { id: req.params.id },
  });

  if (!authorItem) {
    return res.status(404).json({ status: "error", error: "Author not found" });
  }

  await prisma.author.delete({ where: { id: req.params.id } });
  return res.status(200).json({ status: "success", message: "Author deleted" });
};

export { getAllAuthor, getAuthor, createAuthor, deleteAuthor, updateAuthor };
