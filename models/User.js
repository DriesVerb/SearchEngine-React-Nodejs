const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: "string",
    index: {
      collation: { locale: "en", strength: 2 },
    },
  },
  name: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  age: { type: Number, min: 16, max: 70 },
  country: { type: String },
  salary: { type: Number },
  gender: { type: Boolean },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
