import mongoose, { Schema } from "mongoose";
import { Icourse } from "./Course.Interface";

const courseSchema = new Schema<Icourse>({
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    startDate: { 
        type: Date, 
        required: [true, "Start date is required"] 
    },
    location: { 
        type: String, 
        required: [true, "Location is required"] 
    },
    instruction: { 
        type: String, 
        required: [true, "Instruction is required"] 
    },
    syllabus: { 
        type: String, 
        required: [true, "Syllabus is required"] 
    },
    category: { 
        type: String, 
        required: [true, "Category is required"] 
    },
    image: { 
        type: String, 
        required: [true, "Image URL is required"], 
        default: "" 
    },
    fee: { 
        type: Number, 
        required: [true, "Fee is required"], 
        min: [0, "Fee cannot be negative"] 
    },
    status: { 
        type: String, 
        enum: {
            values: ["upcoming", "ongoing"], 
            message: "Status must be either 'upcoming' or 'ongoing'"
        },
        default: "upcoming" 
    }
})
courseSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate() as Partial<Icourse>;
    if (!update) return next();

    const now = new Date();
    if (update.startDate) {
        const eventStart = new Date(update.startDate);
        if (now < eventStart) {
            update.status = "upcoming"
        }
    }

    next();
});
export const courseModel = mongoose.model('course', courseSchema)