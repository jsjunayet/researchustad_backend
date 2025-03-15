export interface Icourse{
    title:string,
    description:string,
    startDate:Date,
    location:string,
    instruction:string,
    fee:number,
    syllabus:string,
    category:string,
    image:string,
    status:'upcoming'|'ongoing'
}