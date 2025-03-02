import express from 'express';
// import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
// import { USER_ROLE } from '../User/user.constant';
import { AssociateControllers } from './ResearchAccociate.controller';
import { ResearchAssociateValidation } from './ResearchAssociate.validation';

const router = express.Router();

router.get(
  '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.ResearchAssociate),
  AssociateControllers.getSingleAssociate,
);

router.patch(
  '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(ResearchAssociateValidation.UpdateValidationSchema),
  AssociateControllers.updateAssociate,
);

router.delete(
  '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AssociateControllers.deleteAssociate,
);

router.get(
  '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  AssociateControllers.getAllAssociate,
);

export const AssociateRoutes = router;