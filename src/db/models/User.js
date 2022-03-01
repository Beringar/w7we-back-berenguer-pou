const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  enemies: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

const User = model("User", UserSchema, "users");

module.exports = User;
