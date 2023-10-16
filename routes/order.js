import express from "express";
import {
  createOrder,
  getCountOrder,
  getEarningAvg,
  getEarningTotal,
  getOrder,
  getOrdersAll,
  getOrdersUser,
  updateOrder,
} from "../controller/order.js";
import { verifyAdmin, verifyToken } from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrdersUser);
router.get("/all", verifyAdmin, getOrdersAll);
router.get("/earningTotal", verifyAdmin, getEarningTotal);
router.get("/earningEvg", verifyAdmin, getEarningAvg);
router.get("/countOrder", verifyAdmin, getCountOrder);
router.put("/:orderId", verifyAdmin, updateOrder);
router.get("/:orderId", verifyToken, getOrder);

export default router;
