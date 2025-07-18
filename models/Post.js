const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  userProfileImage: {
    type: String,
    require: false,
    default: null,
  },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      text: { type: String, required: true },
      name: { type: String },
      avatar: { type: String },
      userProfileImage: {
        type: String,
        require: false,
        default: null,
      },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = Post = mongoose.model("post", PostSchema);
