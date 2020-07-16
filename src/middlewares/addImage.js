import cloudinaryStorage from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
});

const parser = multer({ storage }).single('birthCert');

export default async (req, res, next) => {
  await parser(req, res, (error) => {
    if (error) return res.json({ error: [error.message] });
    if (!req.file) {
      return res
        .status(422)
        .json({ errors: ['Please upload your birth certificate.'] });
    }
    return next();
  });
};
