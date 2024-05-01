import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVarified: {
    type: Boolean,
  },
  invested: {
    type: [String],
  },
  champaigns: {
    type: [String],
  },
});

const User = mongoose.model("user", userSchema);
export default User;
