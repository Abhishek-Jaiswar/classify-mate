import { Schema, model } from "mongoose";

const activitySchema = new Schema({
  type: {
    type: String,
    enum: [
      "announcement",
      "assignment",
      "submission",
      "grade",
      "course",
      "department",
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient querying
activitySchema.index({ createdAt: -1 });
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ course: 1, createdAt: -1 });
activitySchema.index({ department: 1, createdAt: -1 });

const Activity = model("Activity", activitySchema);

export default Activity;
