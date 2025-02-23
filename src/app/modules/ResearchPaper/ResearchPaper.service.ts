import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IResearchPaper } from "./ResearchPaper.interface";
import { ResearchPaper } from "./ResearchPaper.model";

const postResearchUstad= async(body:IResearchPaper)=>{
    const result = await ResearchPaper.create(body)
    return result
}
const getPublicResearchUstad= async()=>{
    const result = await ResearchPaper.find({ isApproved: true });
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
    deleteResearchUstad

}