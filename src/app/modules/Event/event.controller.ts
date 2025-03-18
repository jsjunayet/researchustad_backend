import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { eventService } from "./event.service";

const Getevent = catchAsync(async (req, res) => {
    const result = await eventService.Getevent();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'event is retrieved succesfully',
      data: result,
    });
  });
const Postevent= catchAsync(async (req,res) =>{
const body = req.body;

const result = await eventService.Postevent(body,req.file)
sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'event is Post succesfully',
      data: result,
})
})

const Updateevent= catchAsync(async (req,res) =>{
    const body = req.body;
    const {id} = req.params
    const result = await eventService.Updateevent(id,body)
    sendResponse(res,{
          statusCode: httpStatus.OK,
          success: true,
          message: 'event is Update succesfully',
          data: result,
    })
    })
        const Deletedevent= catchAsync(async (req,res) =>{
        const {id} = req.params
        const result = await eventService.Deletedevent(id)
        sendResponse(res,{
              statusCode: httpStatus.OK,
              success: true,
              message: 'event is Deleted succesfully',
              data: result,
        })
        })
export const eventController={
    Getevent,
    Postevent,
   Updateevent,
   Deletedevent
}