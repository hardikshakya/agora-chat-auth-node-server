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
    // WARNING: Storing passwords in plain text is not secure.
    // Consider using a library like bcrypt to hash passwords before storing them.
  },
  activated: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
