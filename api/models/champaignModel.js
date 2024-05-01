import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeRequired: {
    type: Number,
    required: true,
  },
  batchNumber: {
    type: Number,
  },
  amountRequired: {
    type: Number,
    required: true,
  },
  filesURL: {
    type: String,
  },
});

const champaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amountRequired: {
      type: Number,
      required: true,
    },
    amountGained: {
      type: Number,
      default:0
    },
    investors: {
      type: [{
        investorID:String,
        equity:Number,
        invested:Number
      }],
    },
    userRef: {
      type: String,
      required: true,
    },
    filesURL: {
      type: String,
    },
    batches: {
      type: [batchSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Champaign = mongoose.model("champaign", champaignSchema);
export default Champaign;
