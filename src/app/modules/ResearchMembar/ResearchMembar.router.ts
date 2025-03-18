import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { AssociateControllers } from './ResearchMembar.controller';
import { ResearchAssociateValidation } from './ResearchMembar.validation';
const router = express.Router();
router.get(
  '/:id',
  AssociateControllers.getSingleAssociate,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.Research_Associate),
  validateRequest(ResearchAssociateValidation.UpdateValidationSchema),
  AssociateControllers.updateAssociate,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  AssociateControllers.deleteAssociate,
);

router.get(
  '/',
  AssociateControllers.getAllAssociate,
);

export const AssociateRoutes = router;