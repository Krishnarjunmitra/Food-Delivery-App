
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://krishnarjunmitra:adKQrYJT4erADpFb@cluster0.xhnnnmb.mongodb.net/food-delivery').then(()=>console.log("MongoDB connected successfully"));
}