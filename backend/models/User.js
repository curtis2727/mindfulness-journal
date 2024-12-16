const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, 
      trim: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], 
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'], 
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  try {
    this.password = await bcrypt.hash(this.password, 10); 
    next();
  } catch (err) {
    next(new Error('Error hashing password')); 
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); 
  } catch (err) {
    throw new Error('Error comparing passwords'); 
  }
};

UserSchema.statics.findByEmail = async function (email) {
  try {
    return await this.findOne({ email });
  } catch (err) {
    throw new Error('Error finding user by email'); 
  }
};

UserSchema.statics.findByUsername = async function (username) {
  try {
    return await this.findOne({ username });
  } catch (err) {
    throw new Error('Error finding user by username'); 
  }
};

UserSchema.statics.registerUser = async function ({ username, email, password }) {
  try {
    const newUser = new this({ username, email, password });
    return await newUser.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new Error('Username or email already exists'); 
    }
    throw new Error('Error registering new user'); 
  }
};

UserSchema.statics.authenticate = async function (email, password) {
  try {
    const user = await this.findByEmail(email);
    if (!user) throw new Error('User not found'); 

    const isValid = await user.isValidPassword(password);
    if (!isValid) throw new Error('Invalid password'); 

    return user; 
  } catch (err) {
    throw err; 
  }
};

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);