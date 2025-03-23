import mongoose, { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const SchemaBlog = new Schema<IBlog>(
    {
      title: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
      image: { type: String, required: true },
      shortDescription: { type: String, required: true },
      category: { type: String, required: true },
      publishedDate: { type: Date, required: true },
    },
    { timestamps: true } 
  );
  
  export const Blog = model<IBlog>('Blog', SchemaBlog);