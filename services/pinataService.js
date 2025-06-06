const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

exports.uploadImageToPinata = async (filePath) => {
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  const response = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data,
    {
      maxBodyLength: Infinity,
      headers: {
        ...data.getHeaders(),
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    }
  );

  fs.unlinkSync(filePath);

  return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
};

exports.uploadJSONToPinata = async (json) => {
  const response = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    json,
    {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    }
  );

  return {
    ipfsHash: response.data.IpfsHash,
    url: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
  };
};
