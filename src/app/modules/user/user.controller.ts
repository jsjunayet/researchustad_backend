import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
const createResearchMembar = catchAsync(async (req, res) => {
  const { password, ResearchMembar: ResearchMembarData} = req.body;
  console.log(ResearchMembarData);
  const result = await UserServices.createResearchMembar(
    req.file,
    password,
    ResearchMembarData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ResearchMembar is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getMe(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const Alluser = catchAsync(async (req, res) => {
  const result = await UserServices.Alluser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User is retrieved succesfully',
    data: result,
  });
});
const userToadmin = catchAsync(async (req, res) => {
  const {id}=req.params
  const result = await UserServices.userToadmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'userToadmin is  succesfully',
    data: result,
  });
});

export const UserControllers = {
  getMe,
  createResearchMembar,
  Alluser,
  userToadmin
};
