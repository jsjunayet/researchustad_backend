// import { NextFunction, Request, Response, Router } from "express";
// import { upload } from "../../utils/sendImageToCloudinary";
// import { USER_ROLE } from "../User/user.constant";
// import validateRequest from "../../middlewares/validateRequest";
// import auth from "../../middlewares/auth";

// const router = Router();
// router.get('/', blogController.Getblog)
// router.post('/',   auth(USER_ROLE.superAdmin,USER_ROLE.admin),
//  upload.single('file'),
//  (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(Validationblog.blogValidationPost),
//  blogController.Postblog)
// router.patch('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(Validationblog.blogValidationUpdate),
// blogController.Updateblog)
// router.delete('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin),blogController.Deletedblog)
// export const blogRouter = router;