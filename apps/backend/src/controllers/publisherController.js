import { prisma } from "../config/db.js";

const getAllPublisher = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Filtering
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

    const publishers = await prisma.publisher.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: order,
      },
    });

    const total = await prisma.publisher.count({ where });

    return res.status(200).json({
      status: "success",
      data: publishers,
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

const getPublisher = async (req, res) => {
  const publisher = await prisma.publisher.findUnique({
    where: { id: req.params.id },
  });

  if (!publisher) {
    return res
      .status(404)
      .json({ status: "error", error: "Publisher not found" });
  }

  return res.status(200).json({ status: "success", data: publisher });
};

const createPublisher = async (req, res) => {
  const { name } = req.body;

  if (!req.body.name) {
    return res.status(400).json({ status: "error", error: "Name is required" });
  }
  // check if publisher already added
  const publisherItem = await prisma.publisher.create({
    data: { name },
  });

  return res.status(201).json({ status: "success", data: publisherItem });
};

const updatePublisher = async (req, res) => {
  const { name } = req.body;
  //Find publisher item
  const publisherItem = await prisma.publisher.findUnique({
    where: { id: req.params.id },
  });

  if (!publisherItem) {
    return res
      .status(404)
      .json({ status: "error", error: "Publisher not found" });
  }

  // Build update data
  const updateData = {};
  if (name !== undefined) updateData.name = name;

  const updatedItem = await prisma.publisher.update({
    where: { id: req.params.id },
    data: updateData,
  });

  return res.status(200).json({ status: "success", data: updatedItem });
};

const deletePublisher = async (req, res) => {
  //Find publisher item
  const publisherItem = await prisma.publisher.findUnique({
    where: { id: req.params.id },
  });

  if (!publisherItem) {
    return res
      .status(404)
      .json({ status: "error", error: "Publisher not found" });
  }

  await prisma.publisher.delete({ where: { id: req.params.id } });
  return res
    .status(200)
    .json({ status: "success", message: "Publisher deleted" });
};

export {
  getAllPublisher,
  getPublisher,
  createPublisher,
  deletePublisher,
  updatePublisher,
};
