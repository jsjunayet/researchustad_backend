import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ResearchPaperRoutes } from '../modules/ResearchPaper/ResearchPaper.route';
import { AssociateRoutes } from '../modules/ResearchMembar/ResearchMembar.router';
import { CourseRouter } from '../modules/Course/Course.router';
import { eventRouter } from '../modules/Event/event.router';
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
  {
    path: '/event',
    route: eventRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
