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
  filesUrls: {
    type: [String],
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
    },
    userRef: {
      type: String,
    },
    filesURLs: {
      type: [String],
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
