import { Schema, model } from 'mongoose';
import { IResearchAssociate } from './ResearchAssociate.interface';



const ResearchAssociateSchema = new Schema<IResearchAssociate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    profileImg: { type: String, default: '' },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      contactNo: { type: String, required: [true, 'Contact number is required'] },
    fullName: { type: String, required: true }, 
    designation: { type: String, required: true },
    current: 
      {
        institution: { type: String, required: true },
        department: { type: String, required: true },
        degree: { type: String, required: true },
      },

    education: 
      {
        degree: { type: String, required: true },
        field: { type: String, required: true },
        institution: { type: String, required: true },
        status: { type: String, enum: ["Ongoing", "Completed"], required: true },
        scholarship: { type: String },
      },
  
    research: [{ type: String }],
    shortBio: { type: String }, 
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);


ResearchAssociateSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ResearchAssociateSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ResearchAssociateSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

ResearchAssociateSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await ResearchAssociate.findOne({ email});
  return existingUser;
};

export const ResearchAssociate = model<IResearchAssociate>('ResearchAssociate', ResearchAssociateSchema);


