const fs = require('fs');
const { uploadImageToPinata, uploadJSONToPinata } = require('../services/pinataService');

exports.uploadProduct = async (req, res) => {
  try {
    const imageFile = req.file;
    const productData = JSON.parse(req.body.product);

    const imageUrl = await uploadImageToPinata(imageFile.path);

    const finalProduct = { ...productData, image: imageUrl };

    const result = await uploadJSONToPinata(finalProduct);

    res.json({
      message: 'Product uploaded successfully',
      metadataUrl: result.url,
      ipfsHash: result.ipfsHash,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};
