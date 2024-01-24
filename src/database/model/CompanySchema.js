import mongoose from "mongoose";
import { Schema } from "mongoose";


const companySchema = new Schema({
  company_name: { type: "string", required: true },
  deleted_at: { type: Date },
},{ timestamps:true});

export const Company =mongoose.models.Company || mongoose.model("Company", companySchema);