import { Schema, model } from "mongoose";

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  head: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Department = model("Department", departmentSchema);

export default Department;
