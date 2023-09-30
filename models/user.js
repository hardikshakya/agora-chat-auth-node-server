const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userUuid: {
    type: String,
    required: true,
  },
  chatUsername: {
    type: String,
    required: true,
  },
  chatNickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
