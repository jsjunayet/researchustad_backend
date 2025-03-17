import { NextFunction, Request, Response, Router } from "express";
import { courseController } from "./Course.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();
router.get('/', courseController.GetCourse)
router.post('/',  upload.single('file'),
 (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
 courseController.PostCourse)
router.patch('/:id', courseController.UpdateCourse)
router.delete('/:id',courseController.DeletedCourse)
export const CourseRouter = router;