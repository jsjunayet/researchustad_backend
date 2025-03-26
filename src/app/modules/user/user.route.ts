/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from './user.constant';
import { ResearchAssociateValidation } from '../ResearchMembar/ResearchMembar.validation';
import { UserControllers } from './user.controller';
const router = express.Router();
router.post(
  '/create-ResearchMembar',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ResearchAssociateValidation.createValidationSchema),
  UserControllers.createResearchMembar
);

router.post(
  '/create-ResearchMembars',
  validateRequest(ResearchAssociateValidation.createValidationSchema),
  UserControllers.createResearchMembars
);

router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.user
  ),
  UserControllers.getMe,
);

router.get(
  '/all',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
  ),
  UserControllers.Alluser,
);
router.put(
  '/userToadmin/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
  ),
  UserControllers.userToadmin,
);

export const UserRoutes = router;
