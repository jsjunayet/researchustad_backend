import { Icourse } from "./Course.Interface"
import { courseModel } from "./Course.model"
import { io } from "../../utils/socket";  // Socket emitter

const GetCourse= async()=>{
    const result = await courseModel.find()
    return result
}

const PostCourse = async(body:Icourse)=>{
    const result = await courseModel.create(body)
    const course = await courseModel.find();
    io.emit('courseUpdate', course)
    return result
}
const  UpdateCourse =async(id:string, body:Icourse)=>{
    const result = await courseModel.findByIdAndUpdate(id,{body});
    const courses = await courseModel.find();
    io.emit("courseUpdate", courses);
    return result
}
const DeletedCourse =async(id:string)=>{
    const result = await courseModel.findByIdAndDelete(id);
    const courses = await courseModel.find();
    io.emit("courseUpdate", courses);
    return result
}
export const courseService={
    GetCourse,
    PostCourse,
   UpdateCourse,
   DeletedCourse
}