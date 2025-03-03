import { Types } from "mongoose";

export interface IResearchAssociate {
      user: Types.ObjectId;
      profileImg?: string;
      fullName: string; 
    email: string;
    contactNo: string;
    designation: string; 
    current?: {
      institution?: string;
      department?: string;
      degree?: string;
    }; 
    education?: {
      degree?: string;
      field?: string;
      institution?: string;
      status?: "Ongoing" | "Completed";
      scholarship?: string;
    }; 
    research?: string[]; 
    shortBio?: string; 
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    },
    isDeleted:boolean;
  }
  