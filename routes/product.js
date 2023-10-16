import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getCategory,
  getDetailProduct,
  pagination,
} from "../controller/product.js";
import express from "express";
import fileUploader from "../configs/cloudinary.config.js";
import { verifyAdmin, verifyCounselors } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/pagination", pagination);

router.get("/", getAllProduct);
router.get("/:productId", getDetailProduct);
router.put(
  "/:productId",
  verifyAdmin,
  fileUploader.array("image"),
  editProduct
);
router.post("/", verifyAdmin, fileUploader.array("image"), addProduct);

router.delete("/:productId", verifyAdmin, deleteProduct);

export default router;
