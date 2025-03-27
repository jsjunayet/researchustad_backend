/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from './user.interface';
import { sendEmail } from '../../utils/sendEmail';
import { IResearchMembar } from '../ResearchMembar/ResearchMembar.interface';
import { User } from './user.model';
import { ResearchMembar } from '../ResearchMembar/ResearchMembar.model';
import { ResearchPaper } from '../ResearchPaper/ResearchPaper.model';
import { Blog } from '../Blog/blog.model';
const createResearchMembar = async (
  file: any,
  password: string,
  payload: IResearchMembar,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.designation = payload.designation;
  userData.email = payload.email;
  userData.fullName =payload.fullName
  const session = await mongoose.startSession();

  try {
   await session.startTransaction();
    if (file) {
      const imageName = `${userData.email}${payload?.fullName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
      userData.image=secure_url as string
    }
    const newUser = await User.create([userData], { session });
 
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.email = newUser[0].email;
    payload.user = newUser[0]._id;
    const newStudent = await ResearchMembar.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Membar');
    }
    const plainPassword = password || (config.default_password as string);

    const subject = 'Welcome to ResearchUstad'
    const emailContent = `
       <h2 style="color: #4CAF50; text-align: center;">Welcome to ResearchUstad!</h2>
    <p>Dear ${payload.fullName},</p>
    <p>Congratulations! Your account has been successfully created on <strong>ResearchUstad</strong>. You now have access to our platform and can start exploring.</p>
    <h3>Your Account Details:</h3>
    <ul>
      <li><strong>Email:</strong>  ${newUser[0].email}</li>
      <li><strong>Password:</strong> ${plainPassword}</li>
      <li><strong>designation:</strong> ${newUser[0].designation}</li>
    </ul>
    <p>For security reasons, we strongly recommend that you change your password immediately after logging in.</p>

    <p><a href="${config.frontend_url} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Log In</a></p>

    <p>If you have any questions, feel free to reach out to our support team.</p>

    <p>Best regards,</p>
    <p><strong>The ResearchUstad Team</strong></p>
    `;

    await sendEmail(newUser[0].email, emailContent, subject);
    await session.commitTransaction();
    // await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    // await session.endSession();
    throw err
  }finally{
    await session.endSession()
  }
};

const createResearchMembars = async (
  password: string,
  payload: IResearchMembar,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.designation = payload.designation;
  userData.email = payload.email;
  userData.fullName =payload.fullName
  const session = await mongoose.startSession();
  userData.image=payload.profileImg as string

  try {
     session.startTransaction();
    const newUser = await User.create([userData], { session });
 
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.email = newUser[0].email;
    payload.user = newUser[0]._id;
    const newStudent = await ResearchMembar.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Membar');
    }
    const plainPassword = password || (config.default_password as string);

    const subject = 'Welcome to ResearchUstad'
    const emailContent = `
       <h2 style="color: #4CAF50; text-align: center;">Welcome to ResearchUstad!</h2>
    <p>Dear ${payload.fullName},</p>
    <p>Congratulations! Your account has been successfully created on <strong>ResearchUstad</strong>. You now have access to our platform and can start exploring.</p>
    <h3>Your Account Details:</h3>
    <ul>
      <li><strong>Email:</strong>  ${newUser[0].email}</li>
      <li><strong>Password:</strong> ${plainPassword}</li>
      <li><strong>designation:</strong> ${newUser[0].designation}</li>
    </ul>
    <p>For security reasons, we strongly recommend that you change your password immediately after logging in.</p>

    <p><a href="${config.frontend_url} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Log In</a></p>

    <p>If you have any questions, feel free to reach out to our support team.</p>

    <p>Best regards,</p>
    <p><strong>The ResearchUstad Team</strong></p>
    `;

    await sendEmail(newUser[0].email, emailContent, subject);
    await session.commitTransaction();
    // await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    // await session.endSession();
    throw err
  }finally{
    await session.endSession()
  }
};
const getMe = async (email: string) => {
   const result = await User.findOne({ email: email });
   return result
};
const Alluser = async () => {
  const result = await User.find();
  return result
};
const AllInfo = async () => {
  const [
    totalUsers,
    totalResearchMembers,
    totalApprovedPapers,
    totalPendingPapers,
    totalResearchPapers,
    totalBlogs
  ] = await Promise.all([
    User.countDocuments(),
    ResearchMembar.countDocuments(),
    ResearchPaper.countDocuments({ isApproved: true }),
    ResearchPaper.countDocuments({ isApproved: false }),
    ResearchPaper.countDocuments(),
    Blog.countDocuments(),
  ]);

  return {
    totalUsers,
    totalResearchMembers,
    totalApprovedPapers,
    totalPendingPapers,
    totalResearchPapers,
    totalBlogs,
  };
};

const AllInfoForPersonal = async (id:string) => {
  const [
    totalApprovedPapers,
    totalPendingPapers,
    totalResearchPapers,
    totalBlogs
  ] = await Promise.all([
    ResearchPaper.countDocuments({ isApproved: true,user:id }),
    ResearchPaper.countDocuments({ isApproved: false, user:id}),
    ResearchPaper.countDocuments({user:id}),
    Blog.countDocuments({author:id}),
  ]);

  return {
    totalApprovedPapers,
    totalPendingPapers,
    totalResearchPapers,
    totalBlogs,
  };
};

const userToadmin = async (id:string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  const newRole = user.role === "admin" ? "user" : "admin";
  const result = await User.findByIdAndUpdate(
    id,
    { role: newRole },
    { new: true, runValidators: true }
  );
  return result
}
export const UserServices = {
  getMe,
  createResearchMembar,
  Alluser,
  userToadmin,
  createResearchMembars,
  AllInfo,
  AllInfoForPersonal
};
