const express = require('express');
const router = express.Router();
const { getAllCats, postCat } = require('../models/cat');

router.get('/api/cats', async (req, res) => {
    const cats = await getAllCats();
    res.json({statusCode: 200, data: cats});
});

router.post('/api/cat', async (req, res) => {
    const cat = req.body;
    const result = await postCat(cat);
    res.json({statusCode: 201, data: result});
});

module.exports = router;