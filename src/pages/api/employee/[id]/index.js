import { connectDB } from "@/database/dbConnection";
import { Company } from "@/database/model/CompanySchema";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import { Employee } from "@/database/model/EmployeeSchema";
import mongoose from "mongoose";



const getMaxSalary=async (id)=>{
  

  const highest = await Employee.aggregate([
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $group: {
        _id: "$company_id",
        maxSalary: { $max: "$salary" },
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "company_id",
        as: "employees",
      },
    },
    {
      $unwind: "$employees",
    },
    {
      $match: {
        $expr: { $eq: ["$employees.salary", "$maxSalary"] },
      },
    },
    {
      $lookup: {
        from: "companies", 
        localField: "employees.company_id",
        foreignField: "_id",
        as: "companyInfo",
      },
    },
    {
      $unwind: "$companyInfo",
    },
    {
      $project: {
        _id: "$employees._id",
        name: "$employees.name",
        dob: "$employees.dob",
        email: "$employees.email",
        phone: "$employees.phone",
        salary: "$employees.salary",
        company_id: "$employees.company_id",
        companyName: "$companyInfo.company_name",
      },
    },
  ]);

  const secondHighest = await Employee.aggregate([
    {
      $match: {
        company_id: new mongoose.Types.ObjectId(id),
        isdeleted: false,
      },
    },
    {
      $group: {
        _id: "$company_id",
        maxSalary: { $max: "$salary" },
      },
    },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "company_id",
        as: "employees",
      },
    },
    {
      $unwind: "$employees",
    },
    {
      $match: {
        $expr: { $ne: ["$employees.salary", "$maxSalary"] },
      },
    },
    {
      $lookup: {
        from: "companies", 
        localField: "employees.company_id",
        foreignField: "_id",
        as: "companyInfo",
      },
    },
    {
      $unwind: "$companyInfo",
    },
    {
      $project: {
        _id: "$employees._id",
        name: "$employees.name",
        dob: "$employees.dob",
        email: "$employees.email",
        phone: "$employees.phone",
        salary: "$employees.salary",
        company_id: "$employees.company_id",
        companyName: "$companyInfo.company_name",

      },
    },
  ]);

return {highest:highest,secondHeight:secondHighest};
  
}



export default asyncErrorHandler( async function handler(req, res) {
  await connectDB();
  if (req.method === 'GET') {
    const { id } = req.query;
    const data=await getMaxSalary(id)
    res.status(201).json({
      status: true,
      data:data,
    });
  } else if(req.method==="POST") {
   
  }else if(req.method==="PUT"){
   
  }
})
