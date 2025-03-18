/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from './user.interface';
import { sendEmail } from '../../utils/sendEmail';
import { IResearchAssociate } from '../ResearchAssociate/ResearchAssociate.interface';
import { ResearchAssociate } from '../ResearchAssociate/ResearchAssociate.model';
import { User } from './user.model';



const createResearchAssociate = async (
  file: any,
  password: string,
  payload: IResearchAssociate,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'ResearchAssociate';
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (file) {
      const imageName = `${userData.email}${payload?.fullName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }

    const newUser = await User.create([userData], { session });
 
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.email = newUser[0].email;
    payload.user = newUser[0]._id; 
    const newStudent = await ResearchAssociate.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
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
    </ul>

    <p>For security reasons, we strongly recommend that you change your password immediately after logging in.</p>

    <p><a href="${config.frontend_url} style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Log In</a></p>

    <p>If you have any questions, feel free to reach out to our support team.</p>

    <p>Best regards,</p>
    <p><strong>The ResearchUstad Team</strong></p>
    `;

    await sendEmail(newUser[0].email, emailContent, subject);


    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};




const getMe = async (email: string, role: string) => {
  let result = null;
  if (role === 'ResearchAssociate') {
    result = await ResearchAssociate.findOne({ email: email }).populate('user');
  }
  return result;
};


export const UserServices = {
  getMe,
  createResearchAssociate
};
