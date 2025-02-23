import mongoose, { Schema } from "mongoose";
import { IResearchPaper } from "./ResearchPaper.interface";

const ResearchPaperSchema = new Schema<IResearchPaper>(
  {
    year: { type: Number, required: true },
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    journal: { type: String, required: true },
    volume: { type: String },
    impactFactor: { type: Number },
    journalRank: { type: String },
    visitLink: { type: String, required: true },
    journalType: { type: String },
    isApproved: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export const ResearchPaper = mongoose.model<IResearchPaper>("ResearchPaper", ResearchPaperSchema);
