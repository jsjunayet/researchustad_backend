import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ResearchPaperControllers } from './ResearchPaper.controller';
import validateRequest from '../../middlewares/validateRequest';
import { researchPaperSchema } from './ResearchPaper.validation';


const router = express.Router();

router.post(
  '/add',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(researchPaperSchema),
  ResearchPaperControllers.postResearchUstad,
);

router.get(
  '/public',
  ResearchPaperControllers.getPublicResearchUstad,
);

router.get(
  '/all',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin,USER_ROLE.faculty),
  ResearchPaperControllers.getAllResearchUstad,
);

router.put(
  '/approve/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  ResearchPaperControllers.approveResearchUstad,
);
router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    ResearchPaperControllers.deleteResearchUstad,
);

export const ResearchPaperRoutes = router;