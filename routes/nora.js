const express = require('express');
const router = express.Router();
const Unishop = require('../models/unishop');

router.get('/', async (req, res) => {
  try {
    const shops = await Unishop.find({ University: 'nora' });
    res.render('nora', { title: 'Princess Nourah University', shops: shops });
  } catch (error) {
    res.status(500).send('Error retrieving shops for Princess Nourah University');
  }
});

module.exports = router;