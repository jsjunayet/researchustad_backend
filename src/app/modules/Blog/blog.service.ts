
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const Getblog= async()=>{
    const result = await Blog.find().populate('author')
    return result
}
const Authorblog= async(id:string)=>{
    const result = await Blog.find({author:id}).populate('author')
    return result
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Postblog = async(body:IBlog, file:any, id:Types.ObjectId)=>{
    if (file) {
        const imageName = `${body.title}${body?.category}`;
        const path = file?.path;
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        body.image = secure_url as string;
    }
    body.author=id
    const result = await Blog.create(body)
    return result
}
const  Updateblog =async(id:string, body:IBlog)=>{
    const result = await Blog.findByIdAndUpdate(id,body, {new:true});
    return result
}
const Deletedblog =async(id:string)=>{
    const result = await Blog.findByIdAndDelete(id);
    if(!result){
    throw new AppError(404, "This blog is not found")
    }
    return result
}
const Getblogsingle =async(id:string)=>{
    const result = await Blog.findById(id).populate('author');
    if(!result){
    throw new AppError(404, "This blog is not found")
    }
    return result
}
export const blogService={
    Getblog,
    Postblog,
   Updateblog,
   Deletedblog,
   Authorblog,
   Getblogsingle
}