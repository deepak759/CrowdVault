import express from "express";
import {
  createChampaign,
  createBatches,
  getAllChampaigns,
  getSpecChampaign,
  investIn
} from "../controllers/champaignController.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyUser, createChampaign);
router.post("/createBatches/:id", verifyUser, createBatches);
router.get("/getAllChampaigns", getAllChampaigns);
router.get("/getSpecChampaign/:id", getSpecChampaign);
router.post('/champaign/:id',verifyUser,investIn)

export default router;
