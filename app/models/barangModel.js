export default (mongoose) => {
  // Membuat skema dan model barang
  const barangSchema = new mongoose.Schema({
    nama: {
      type: String,
      unique: true,
      required: true,
    },
    hargaBeli: {
      type: Number,
      required: true,
    },
    hargaJual: {
      type: Number,
      required: true,
    },
    stok: {
      type: Number,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
  });

  const Barang = mongoose.model("Barang", barangSchema);

  return Barang;
};
