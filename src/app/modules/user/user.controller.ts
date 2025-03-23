import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
const createResearchAssociate = catchAsync(async (req, res) => {
  const { password, ResearchAssociate: ResearchAssociateData} = req.body;
  const result = await UserServices.createResearchAssociate(
    req.file,
    password,
    ResearchAssociateData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ResearchAssociate is created succesfully',
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

export const UserControllers = {
  getMe,
  createResearchAssociate
};
