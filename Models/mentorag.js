const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    colid: {
      type: Number,
      required: [true, "College ID is required"],
      trim: true,
    },
    userid: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    graduationYear: { type: Number, default: null },
    degree: { type: String, trim: true, default: "" },
    department: { type: String, trim: true, default: "" },
    expertise: { type: [String], default: [] },
    achievements: { type: String, trim: true, default: "" },
    mentorshipDomain: { type: String, trim: true, default: "" },
    maxStudents: {
      type: Number,
      required: [true, "Max students is required"],
    },
    sessionDuration: { type: Number, default: 60 },
    availability: { type: [String], default: [] },
    sessionTypes: { type: [String], default: [] },
    mentorshipGoals: { type: String, trim: true, default: "" },
    semester: { type: String, trim: true, required: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "active"],
      default: "pending",
    },
    // add this after the `achievements` field
domains:
 { type: [String], default: [] },
    statusUpdatedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ADD this new schema after the mentorSchema definition
const mentorDomainConfigSchema = new mongoose.Schema(
  {
    colid:     { type: Number, required: true },
    domains: [
      {
        name:        { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: "" },
        enabled:     { type: Boolean, default: true },
      },
    ],
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true }
);
 
const Mentor             = mongoose.model("Mentor", mentorSchema);
const MentorDomainConfig = mongoose.model("MentorDomainConfig", mentorDomainConfigSchema);
module.exports = { Mentor, MentorDomainConfig };