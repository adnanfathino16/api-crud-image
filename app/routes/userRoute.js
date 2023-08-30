import express from "express";
import { daftarUser, getUser, loginUser } from "../controllers/userController.js";
import userMiddleware from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/api/daftar", daftarUser);
router.post("/api/login", loginUser);
router.get("/api/user", userMiddleware, getUser);

export default router;
