const express = require('express');
const router = express.Router();
const Unishop = require('../models/unishop');

router.get('/', async (req, res) => {
  try {
    const shops = await Unishop.find({ University: 'imam' });
    res.render('imam', { title: 'Imam Mohammed bin Saud University', shops: shops });
  } catch (error) {
    res.status(500).send('Error retrieving shops for Imam Mohammed bin Saud University');
  }
});

module.exports = router;