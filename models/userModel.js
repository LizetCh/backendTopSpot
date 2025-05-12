const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
  username: { // username
    type: String,
    required: true,
    unique: true
  },
  email: { // email
    type: String,
    required: true,
    unique: true
  },
  password: { // password
    type: String,
    required: true
  },
  profilePic: { 
    type: String,
    default: null
  }
  
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)