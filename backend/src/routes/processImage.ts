const express = require('express');
const multer = require('multer');
const cv = require('opencv4nodejs');

const ProcessImage = express.Router();

const upload = multer({ dest: 'uploads/' });

ProcessImage.post('/process_image', upload.single('image'), (req, res) => {
  const imgPath = req.file.path;

  // Carrega a imagem
  const image = cv.imread(imgPath);

  // Conversão para escala de cinza
  const grayImage = image.bgrToGray();

  // Detector de código de barras (ajustar parâmetros conforme necessário)
  const barcodeDetector = new cv.QRCodeDetector();
  const barcodeData = barcodeDetector.detectAndDecode(grayImage);

  if (barcodeData) {
    console.log(`Código de barras detectado: ${barcodeData}`);
    res.json({ barcode: barcodeData });
  } else {
    res.json({ error: "Código de barras não detectado" });
  }
});

export default ProcessImage;