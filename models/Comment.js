import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    idProduct: {
      type: String,
      require: true,
    },
    idUser: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    star: {
      type: String,
      default: "5",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
