export interface IResearchPaper{
    year: number;
    title: string;
    authors: string[]; 
    journal: string;
    volume?: string; 
    impactFactor?: number; 
    journalRank?: string; 
    visitLink: string;
    journalType?: string; 
    isApproved: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}