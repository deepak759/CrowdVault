import Champaign from "../models/champaignModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const createChampaign = async (req, res, next) => {
  const champaignData = req.body;

  try {
    const newChampaign = new Champaign(champaignData);
    const createdChampaign = await newChampaign.save();
    res.status(200).json(createdChampaign);
  } catch (error) {
    next(error);
  }
};

export const createBatches = async (req, res, next) => {
  const champaignID = req.params.id;
  try {
    const getChampaign = await Champaign.findById(champaignID);
    if (!getChampaign) return next(errorHandler(404, "Champaign not found"));
    const batchSeq = getChampaign.batches.length;
    getChampaign.batches.push({ ...req.body, batchNumber: batchSeq + 1 });
    const updatedChampaign = await getChampaign.save();
    res.status(200).json(updatedChampaign);
  } catch (error) {
    next(error);
  }
};

export const getAllChampaigns = async (req, res, next) => {
  try {
    const AllChampaigns = await Champaign.find();
    res.status(200).json(AllChampaigns);
  } catch (error) {
    next(error);
  }
};

export const getSpecChampaign = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getChampaign = await Champaign.findById(id);
    if (!getChampaign) return next(errorHandler(404, "Champaign not found"));
    res.status(200).json(getChampaign);
  } catch (error) {
    next(error);
  }
};

export const investIn = async (req, res, next) => {
  const investorID = req.user.id;
  const champaignID = req.params.id;
  const { invested, equity } = req.body;
  try {
    const investor = await User.findById(investorID);
    const champaign = await Champaign.findById(champaignID);
    champaign.amountGained = champaign.amountGained + invested;
    champaign.investors.push({investorID,equity,invested})
    const updatedChampaign=await champaign.save()
    investor.invested.push(champaignID,invested,equity)
    const updatedUser=await investor.save()
    res.status(200).json({updatedChampaign,updatedUser})
  } catch (error) {
    next(error)
  }
};
