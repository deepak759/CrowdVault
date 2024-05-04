import Champaign from "../models/champaignModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OsnSiSCYJhYhwAnTIAsJAZw0BWBoPEHyXpIe1jWRiMPuxkcYNt9aU93X79pbdwC9pOcGmxvKkbJkRZP0xaRm3Uk00yGyka0Tr');


export const createChampaign = async (req, res, next) => {
    const champaignData = req.body;
  
    try {
      const newChampaign = new Champaign({...champaignData,userRef:req.user.id});
      const createdChampaign = await newChampaign.save();

      const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { champaigns: createdChampaign._id } }, 
        { new: true } 
      );
  
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

    champaign.amountGained +=  parseInt(invested);

    champaign.investors.push({investorID,equity,invested})

    const updatedChampaign=await champaign.save()

    investor.invested.push({champaignID,invested,equity})

    const updatedUser=await investor.save()

    res.status(200).json({updatedChampaign,updatedUser})

  } catch (error) {
    next(error)
  }
};


export const searchHandler=async(req,res,next)=>{
  const searchTerm = req.query.searchTerm || "money";
  const sort = req.query.sort || "createdAt";
  try {
    const champaigns = await Champaign.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ [sort]: "desc" });
   
    res.status(200).json(champaigns);
  } catch (error) {
    next(error);
  }
}

export const payment=async(req,res,next)=>{
  const product = req.body.products;
 console.log(product)
  const items = product.map((pro) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: pro.title,
      images:[pro.coverImage]
      },
      unit_amount: (parseInt(pro.invested)+parseInt(pro.tip))*100,
    },
    quantity: 1,
  }));
  req.session.products = product;
  console.log(items)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/",
  });
console.log(session)
  res.json( session);

}