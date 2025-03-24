import mongoose from "mongoose";

export interface IBlog {
  title: string;
  author: mongoose.Types.ObjectId;
  image: string;
  shortDescription: string
  category: string;
  publishedDate: Date;
}




