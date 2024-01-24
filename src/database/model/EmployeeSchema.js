import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    name: { type: String },
    dob: { type: Date },
    email: { type: String },
    phone: { type: String },
    salary: { type: Number },
    // created_at: { type: Date, default: Date.now },
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
