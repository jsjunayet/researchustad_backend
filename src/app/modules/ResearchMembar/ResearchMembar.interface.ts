import { Types } from "mongoose";
export interface IResearchMembar {
      user: Types.ObjectId;
      profileImg?: string;
      fullName: string; 
    email: string;
    contactNo: string;
    designation: "Advisor" | "Lead" | "Mentor_Panel" | "Lead_Research_Associate" | "Research_Associate"; 
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
  