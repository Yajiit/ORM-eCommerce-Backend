const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// ROUTE TO GET ALL TAGS
router.get('/', async (req, res) => {
  try {
  // find all tags
   const tagsData = await Tag.findAll({
  // be sure to include its associated Product data
   include: [{ model: Product, through: ProductTag }],
  });
  res.status(200).json(tagsData);
} catch (err) {
  res.status(500).json(err);
}
});
// ROUTE TO GET TAG BY ID
router.get('/:id', async (req, res) => {
  try {
  // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
  // create a new tag    
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
