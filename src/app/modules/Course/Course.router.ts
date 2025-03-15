import { Router } from "express";
import { courseController } from "./Course.controller";

const router = Router();
router.get('/', courseController.GetCourse)
router.post('/', courseController.PostCourse)
router.patch('/:id', courseController.UpdateCourse)
router.delete('/:id',courseController.DeletedCourse)
export const CourseRouter = router;