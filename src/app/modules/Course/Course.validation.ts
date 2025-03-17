import { z } from "zod";

const courseValidationPost= z.object({
    body:z.object({
        title:z.string(),
        startDate:z.string(),
        location: z.string(),
        instruction: z.string(),
        syllabus: z.string(),
        category: z.string(),
        image: z.string().optional(),
        fee: z.number(),
        status: z.enum(["upcoming", "ongoing"]).optional()
    })
})
const courseValidationUpdate=z.object({
    body:z.object({
        title:z.string().optional(),
        startDate:z.string().optional(),
        location: z.string().optional(),
        instruction: z.string().optional(),
        syllabus: z.string().optional(),
        category: z.string().optional(),
        image: z.string().optional(),
        fee: z.number().optional(),
        status: z.enum(["upcoming", "ongoing"]).optional()
    })
})
export const ValidationCourse = {
    courseValidationPost,
    courseValidationUpdate
}