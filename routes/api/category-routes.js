const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// ROUTE TO GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
  // find all categories
  const categoriesData = await Category.findAll({
  // be sure to include its associated Products
  include: [{ model: Product }],
  });
res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err);
}
});
// ROUTE TO GET CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
      const categoryData = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE TO CREATE NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    // Check if the required category_name is provided and it's a string
    if (!req.body.category_name || typeof req.body.category_name !== 'string') {
      res.status(400).json({ message: 'Invalid category name provided.' });
      return;
    }
  // create a new category    
    const newCategory = await Category.create(req.body);
    res.status(200).json({ message: 'Category successfully created!', category: newCategory });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category.', error: err.message });
  }
});
// ROUTE TO UPDATE CATEGORY
router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found or no changes made.' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully.'});
  } catch (err) {
    res.status(400).json(err);
  }
});
// ROUTE TO DELETE CATEGORY
router.delete('/:id', async (req, res) => {
  try {
      // delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }

    res.status(200).json({ message: 'CATEGORY DELETED.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
