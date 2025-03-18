interface Speaker {
    name: string;
    bio: string;
    imageUrl: string;
}
export interface IEvent {
    title: string;
    description: string;
    startDate: Date;
    location: string;
    speakers: Speaker[];
    imageUrl: string;
    registrationLink: string;
    category: string;
    status:'upcoming'|'ongoing'| 'finished'
    eventDuration:number

}
