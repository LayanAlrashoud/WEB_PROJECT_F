const express = require('express');
const router = express.Router();
const Unishop = require('../models/unishop');

router.get('/', async (req, res) => {
  try {
    const shops = await Unishop.find({ University: 'saud' });
    res.render('saud', { title: 'King Saud University', shops: shops });
  } catch (error) {
    res.status(500).send('Error retrieving shops for King Saud University');
  }
});

module.exports = router;