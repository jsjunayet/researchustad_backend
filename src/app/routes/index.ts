import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { ResearchPaperRoutes } from '../modules/ResearchPaper/ResearchPaper.route';
import { AssociateRoutes } from '../modules/ResearchAssociate/ResearchAccociate.router';
import { CourseRouter } from '../modules/Course/Course.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/paper',
    route: ResearchPaperRoutes,
  },
  {
    path: '/researchAssociate',
    route: AssociateRoutes,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
