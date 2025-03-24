import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";

const Getblog = catchAsync(async (req, res) => {
    const result = await blogService.Getblog();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'blog is retrieved succesfully',
      data: result,
    });
  });

  const Authorblog = catchAsync(async (req, res) => {
    const {id}=req.user
    const result = await blogService.Authorblog(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Personal blog is retrieved succesfully',
      data: result,
    });
  });
const Postblog= catchAsync(async (req,res) =>{
const body = req.body;
const {id}=req.user


const result = await blogService.Postblog(body,req.file, id)
sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'blog is Post succesfully',
      data: result,
})
})

const Updateblog= catchAsync(async (req,res) =>{
    const body = req.body;
    const {id} = req.params
    const result = await blogService.Updateblog(id,body)
    sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: 'blog is Update succesfully',
          data: result,
    })
    })
       const Deletedblog= catchAsync(async (req,res) =>{
        const {id} = req.params
        const result = await blogService.Deletedblog(id)
        sendResponse(res,{
              statusCode: httpStatus.OK,
              success: true,
              message: 'blog is Deleted succesfully',
              data: result,
        })
        })

        const Getblogsingle= catchAsync(async (req,res) =>{
            const {id} = req.params
            const result = await blogService.Deletedblog(id)
            sendResponse(res,{
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'blog is Single succesfully',
                  data: result,
            })
            })
export const blogController={
    Getblog,
    Postblog,
   Updateblog,
   Deletedblog,
   Authorblog,
   Getblogsingle
}