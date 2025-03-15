import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./Course.service";

const GetCourse = catchAsync(async (req, res) => {
    const result = await courseService.GetCourse();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is retrieved succesfully',
      data: result,
    });
  });
const PostCourse= catchAsync(async (req,res) =>{
const body = req.body;
const result = await courseService.PostCourse(body)
sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is Post succesfully',
      data: result,
})
})

const UpdateCourse= catchAsync(async (req,res) =>{
    const body = req.body;
    const {id} = req.params
    const result = await courseService.UpdateCourse(id,body)
    sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: 'Course is Update succesfully',
          data: result,
    })
    })
        const DeletedCourse= catchAsync(async (req,res) =>{
        const {id} = req.params
        const result = await courseService.DeletedCourse(id)
        sendResponse(res,{
              statusCode: httpStatus.OK,
              success: true,
              message: 'Course is Deleted succesfully',
              data: result,
        })
        })
export const courseController={
    GetCourse,
    PostCourse,
   UpdateCourse,
   DeletedCourse
}