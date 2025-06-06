const express = require('express');
const multer = require('multer');
const { uploadProduct } = require('../controllers/productController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadProduct);

module.exports = router;