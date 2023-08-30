import express from "express";
import upload from "../middleware/barangMiddleware.js";
import { deleteBarang, getBarang, getBarangById, saveBarang, updateBarang } from "../controllers/barangController.js";

const router = express.Router();

router.post("/api/barang", upload, saveBarang);
router.get("/api/barang", getBarang);
router.get("/api/barang/:id", getBarangById);
router.delete("/api/barang/:id", deleteBarang);
router.patch("/api/barang/:id", upload, updateBarang);

export default router;
