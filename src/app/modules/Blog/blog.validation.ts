import { z } from "zod";

const blogValidationPost = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
      message: "Invalid author ID format",
    }),
    image: z.string().url({ message: "Invalid blog image URL format" }),
    shortDescription: z.string().min(1, { message: "Short description is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid published date format",
    }),
  }),
});

const blogValidationUpdate = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    author: z.string().refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
      message: "Invalid author ID format",
    }).optional(),
    image: z.string().url({ message: "Invalid blog image URL format" }).optional(),
    shortDescription: z.string().min(1, { message: "Short description is required" }).optional(),
    category: z.string().min(1, { message: "Category is required" }).optional(),
    publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid published date format",
    }).optional(),
  }),
});

export const Validationblog = {
  blogValidationPost,
  blogValidationUpdate,
};
