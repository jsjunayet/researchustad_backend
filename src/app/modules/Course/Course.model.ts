import mongoose, { Schema } from "mongoose";
import { Icourse } from "./Course.Interface";

const courseSchema = new Schema<Icourse>({
    title:{type:String, required:true},
    startDate:{type:Date, required:true},
    location:{type:String, required:true},
    instruction:{type:String, required:true},
   syllabus:{type:String, required:true},
   category:{type:String, required:true},
   image:{type:String, required:true},
   fee:{type:Number, required:true},
   status:{type:String, enum:['upcoming',"ongoing"], default:"upcoming"}
})
export const courseModel = mongoose.model('course', courseSchema)