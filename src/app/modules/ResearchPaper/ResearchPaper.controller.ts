import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResearchPaperService } from "./ResearchPaper.service";

const postResearchUstad = catchAsync(async (req, res) => {
    const result = await ResearchPaperService.postResearchUstad(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper Create succesfully',
      data: result,
    });
  });
  const getPublicResearchUstad = catchAsync(async (req, res) => {
    const result = await ResearchPaperService.getPublicResearchUstad();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper retrieved succesfully',
      data: result,
    });
  });
  const getOngingResearchUstad = catchAsync(async (req, res) => {
    const result = await ResearchPaperService.getOngingResearchUstad();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper Onging retrieved succesfully',
      data: result,
    });
  });
  const getAllResearchUstad= catchAsync(async (req, res) => {
    const result = await ResearchPaperService.getAllResearchUstad();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper getAll retrieved succesfully',
      data: result,
    });
  });
  const approveResearchUstad = catchAsync(async (req, res) => {
    const result = await ResearchPaperService.approveResearchUstad(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper Approve succesfully',
      data: result,
    });
  });
  const deleteResearchUstad = catchAsync(async (req, res) => {
    const result = await ResearchPaperService.deleteResearchUstad(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ResearchPaper Deleted succesfully',
      data: result,
    });
  });



export const ResearchPaperControllers={
    postResearchUstad,
    getPublicResearchUstad,
    getAllResearchUstad,
    approveResearchUstad,
    deleteResearchUstad,
    getOngingResearchUstad
}