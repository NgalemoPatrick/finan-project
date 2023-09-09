const AutoIncrement = require("mongoose-sequence")(mongoose);

const mongoose = require("mongoose");

//  user Schema
const userSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.plugin( AutoIncrement, {
    inc_field: 'useId',
    id: 'userNums',
    start_seq: 100
})

module.exports = mongoose.model("Users", userSchema);
