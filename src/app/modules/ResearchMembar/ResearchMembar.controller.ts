import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AssociateServices } from './ResearchMembar.service';

const getSingleAssociate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AssociateServices.getSingleAssociate(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Associate is retrieved succesfully',
    data: result,
  });
});

const getAllAssociate = catchAsync(async (req, res) => {
  const result = await AssociateServices.getAllAssociate(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Associate are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateAssociate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ResearchAssociate } = req.body;
  const result = await AssociateServices.updateAssociate(id, ResearchAssociate);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Associate is updated succesfully',
    data: result,
  });
});

const deleteAssociate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AssociateServices.deleteAssociate(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Associate is deleted succesfully',
    data: result,
  });
});

export const AssociateControllers = {
  getSingleAssociate,
  updateAssociate,
  deleteAssociate,
  getAllAssociate,

};
