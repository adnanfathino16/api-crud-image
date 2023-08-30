import db from "../models/index.js";
import path from "path";
import fs from "fs";
const Barang = db.barang;

export const saveBarang = async (req, res) => {
  const { nama, hargaBeli, hargaJual, stok } = req.body;

  const namaBarang = await Barang.findOne({ nama: nama });

  if (namaBarang) {
    const imagePath = path.join("public", "uploads", req.file.filename);
    fs.unlinkSync(imagePath);
    return res.status(404).send({
      success: false,
      message: "nama barang sudah tersedia",
    });
  }

  const newBarang = new Barang({
    nama,
    hargaBeli,
    hargaJual,
    stok,
    foto: req.file.filename,
  });
  newBarang
    .save()
    .then((response) => {
      return res.status(200).json({ success: true, message: "Barang berhasil diunggah" });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "Barang gagal diunggah",
        err: err.message,
      });
    });
};

export const getBarang = async (req, res) => {
  await Barang.find()
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

export const getBarangById = async (req, res) => {
  try {
    const id = req.params.id;
    const barang = await Barang.findById(id);
    return res.json(barang);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const deleteBarang = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndRemove(req.params.id);
    if (barang.foto) {
      const imagePath = path.join("public", "uploads", barang.foto);
      fs.unlinkSync(imagePath);
    }
    return res.json({ success: true, message: "Barang berhasil dihapus." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateBarang = async (req, res) => {
  try {
    const id = req.params.id;
    const { nama, hargaBeli, hargaJual, stok } = req.body;

    const barang = await Barang.findById(id);
    const foto = req.file ? req.file.filename : barang.foto;
    if (foto !== barang.foto) {
      const imagePath = path.join("public", "uploads", barang.foto);
      fs.unlinkSync(imagePath);
    }

    await Barang.findByIdAndUpdate(
      id,
      {
        nama,
        hargaBeli,
        hargaJual,
        stok,
        foto,
      },
      { new: true }
    );
    return res.json({ success: true, message: "Barang Berhasil diUpdate." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
