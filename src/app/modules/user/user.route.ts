/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from './user.constant';

import { UserControllers } from './user.controller';
import { ResearchAssociateValidation } from '../ResearchAssociate/ResearchAssociate.validation';


const router = express.Router();

router.post(
  '/create-ResearchAssociate',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ResearchAssociateValidation.createValidationSchema),
  UserControllers.createResearchAssociate,
);

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.ResearchAssociate
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
