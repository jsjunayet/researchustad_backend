import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { blogController } from "./blog.controller";
import { Validationblog } from "./blog.validation";

const router = Router();
router.get('/', blogController.Getblog)
router.post('/',   auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.user),
 upload.single('file'),
 (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(Validationblog.blogValidationPost),
 blogController.Postblog)
router.patch('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(Validationblog.blogValidationUpdate),
blogController.Updateblog)
router.get('/author', auth(USER_ROLE.superAdmin,USER_ROLE.admin, USER_ROLE.user), blogController.Authorblog)
router.get('/:id',blogController.Getblogsingle)

router.delete('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.user),blogController.Deletedblog)
export const blogRouter = router;