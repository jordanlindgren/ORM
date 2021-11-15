const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const allTags = await Tag.findAll({
    include: Product,
  });
  res.json(allTags);
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  const allTags = await Tag.findByPk(req.params.id, { include: Product });
  res.json(allTags);
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const addTag = await Tag.create(req.body);
    res.status(201).json(addTag);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }

  // create a new tag
});

router.put("/:id", async (req, res) => {
  try {
    let tagId = req.params.id;
    const [rowsModified] = await Tag.update(req.body, {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: tagId,
      },
    });

    if (rowsModified) {
      tagId = req.body.id || req.params.id;
    }

    const updatedTag = await Tag.findByPk(tagId);
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
