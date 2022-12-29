import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: { type: String, required: [true, "last name is required"] },
  userName: { type: String, required: [true, "user name is required"] },
  email: { type: String, required: [true, "email is required"]},
  mobileNumber: { type: Number, required: [true, "phone number is required"] },
  password: { type: String, required: [true, "password is required"],select:false }
});


export default mongoose.model('User',userSchema)