// interface Speaker {
//     name: string;
//     bio: string;
//     imageUrl: string;

import mongoose from "mongoose";

// }
export interface IEvent {
    title: string;
    description: string;
    startDate: Date;
    location: string;
    speakers: mongoose.Types.ObjectId[];  // Array of ObjectId
    imageUrl: string;
    registrationLink: string;
    category: string;
    status:'upcoming'|'ongoing'| 'finished'
    eventDuration:number

}
