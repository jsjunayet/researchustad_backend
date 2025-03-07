/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { ResearchAssociate } from './ResearchAssociate.model';
// import { ResearchAssociate } from './ResearchAssociate.model';
// import { ResearchAssociate } from './ResearchAssociate.model';
// import { ResearchAssociate } from './ResearchAssociate.model';

import { IResearchAssociate } from './ResearchAssociate.interface';
const getAllAssociate = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    ResearchAssociate.find(),
    query,
  )
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  const meta = await facultyQuery.countTotal();
  return {
    result,
    meta,
  };
};
// const getAllAssociate = async (query: Record<string, unknown>) => {
//   const facultyQuery = new QueryBuilder(
//     ResearchAssociate.find(),
//     query,
//   )
//     .search(['email'])
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await facultyQuery.modelQuery;
//   const meta = await facultyQuery.countTotal();
//   return {
//     result,
//     meta,
//   };
// };

const getSingleAssociate = async (email: string) => {
  const result = await ResearchAssociate.findById(email)

  return result;
};

const updateAssociate = async (email: string, payload: Partial<IResearchAssociate>) => {
  const { current, education,socialLinks, ...remainingAssociateData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAssociateData,
  };
  if (current && Object.keys(current).length) {
    for (const [key, value] of Object.entries(current)) {
      modifiedUpdatedData[`current.${key}`] = value;
    }
  }
if(education && Object.keys(education).length){
  for(const[key, value] of Object.entries(education)){
    modifiedUpdatedData[`education.${key}`]=value
  }
}
  if (socialLinks && Object.keys(socialLinks).length) {
    for (const [key, value] of Object.entries(socialLinks)) {
      modifiedUpdatedData[`socialLinks.${key}`] = value;
    }
  }

  const result = await ResearchAssociate.findByIdAndUpdate(email, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAssociate = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAssociate = await ResearchAssociate.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAssociate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    const userId = deletedAssociate.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAssociate;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AssociateServices = {
    getSingleAssociate,
    updateAssociate,
    deleteAssociate,
    getAllAssociate,
};
