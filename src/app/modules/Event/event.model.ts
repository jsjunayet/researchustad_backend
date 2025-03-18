import mongoose, {  Schema } from "mongoose";
import { IEvent } from "./event.interface";

export const eventSchema = new Schema<IEvent>({
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    description: { 
        type: String, 
        required: [true, "Description is required"] 
    },
    startDate: { 
        type: Date, 
        required: [true, "Start date is required"] 
    },
    location: { 
        type: String, 
        required: [true, "Location is required"] 
    },
    speakers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // This will reference the Speaker model
          required: [true, "Speaker ID is required"]
        }
      ],
    imageUrl: { 
        type: String, 
        required: [true, "Event image URL is required"] 
    },
    registrationLink: { 
        type: String, 
        required: [true, "Registration link is required"] 
    },
    category: { 
        type: String, 
        required: [true, "Category is required"] 
    },
    status: { 
        type: String, 
        enum: {
            values: ["upcoming", "ongoing", "finished"], 
            message: "Status must be either 'upcoming' or 'ongoing' or 'finished'"
        },
        default: "upcoming" 
    },
    eventDuration: { 
        type: Number, 
        required: [true, "eventDuration is required"] 
    },
})
eventSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate() as Partial<IEvent>;
    console.log(update);
    if (!update) return next();

    const now = new Date();
    if (update.startDate) {
        const eventStart = new Date(update.startDate);
        const eventEnd = new Date(eventStart.getTime() + (update.eventDuration || 0) * 60000);

        if (now < eventStart) {
            update.status = "upcoming";
        } else if (now >= eventStart && now <= eventEnd) {
            update.status = "ongoing";
        } else {
            update.status = "finished";
        }
    }

    next();
});

export const eventModel = mongoose.model('event', eventSchema)