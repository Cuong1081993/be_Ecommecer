import express from "express";
import {
  deleteCart,
  getCart,
  postCart,
  updatecart,
} from "../controller/cart.js";
import { verifyToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/addCart", verifyToken, postCart);
router.delete("/deleteProductCart/:productId", verifyToken, deleteCart);
router.put("/updateCart/", verifyToken, updatecart);

export default router;
