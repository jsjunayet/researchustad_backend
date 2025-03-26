import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IResearchPaper } from "./ResearchPaper.interface";
import { ResearchPaper } from "./ResearchPaper.model";
import { Types } from "mongoose";

const postResearchUstad= async(body:IResearchPaper, id:Types.ObjectId)=>{
    body.user =id
    const result = await ResearchPaper.create(body)
    return result
}
const getPublicResearchUstad= async()=>{
    const result = await ResearchPaper.find({ isApproved: true });
    return result
}
const getOngingResearchUstad= async()=>{
    const result = await ResearchPaper.find({ isApproved: false });
    return result
}
const getpersonalPaperResearchUstad= async(id:string)=>{
    const result = await ResearchPaper.find({ user:id });
    return result
}
const getpersonalPaperResearchUstadforid= async(id:string)=>{
    const result = await ResearchPaper.findById(id);
    return result
}
const getAllResearchUstad= async()=>{
    const result = await ResearchPaper.find();
    return result
}
const approveResearchUstad= async(id:string)=>{
    const paper = await ResearchPaper.findById(id);
    if (!paper) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }

    paper.isApproved = !paper.isApproved;
    const result =  await paper.save();
  return result

}
const deleteResearchUstad= async(id:string)=>{
    const paper = await ResearchPaper.findById(id);
    if (!paper) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }
  const result=  await ResearchPaper.findByIdAndDelete(id);
    return result
}
export const ResearchPaperService ={
    postResearchUstad,
    getPublicResearchUstad,
    getAllResearchUstad,
    approveResearchUstad,
    deleteResearchUstad,
    getOngingResearchUstad,
    getpersonalPaperResearchUstad,
    getpersonalPaperResearchUstadforid

}