const express = require('express');
const { getStocks, filterStocks, getHeaders, getSuggestions } = require('../controllers/stockController');
const router = express.Router();

router.get('/', getStocks);
router.post('/filter', filterStocks);
router.get('/headers', getHeaders);
router.get('/suggestions', getSuggestions);

module.exports = router;
