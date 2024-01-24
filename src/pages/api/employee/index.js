import { connectDB } from "@/database/dbConnection";
import { Company } from "@/database/model/CompanySchema";
import { asyncErrorHandler } from "@/utils/AsyncErrorHandler";
import { EmployeeValidationSchema } from "../validations/EmployeeValidation";
import { Employee } from "@/database/model/EmployeeSchema";

const getMaxSalary = (id) => {
  const result = awaitEmployee.aggregate([
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
      $project: {
        _id: "$employees._id",
        name: "$employees.name",
        dob: "$employees.dob",
        email: "$employees.email",
        phone: "$employees.phone",
        salary: "$employees.salary",
        company_id: "$employees.company_id",
      },
    },
  ]);

  res.status(201).json({
    status: true,
    data: result,
  });
};

export default asyncErrorHandler(async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    const emp_doc = await Employee.find();

    res.status(201).json({
      status: true,
      data: emp_doc,
    });
  } else if (req.method === "POST") {
    const {
      companyId,
      name,
      dob,
      email,
      phone,
      salary,
      deleted_at,
      updated_at,
    } = req.body;
    const findPhone = await Employee.findOne({ phone: phone });
    if (findPhone) {
      throw new Error("phone number already exist!!", 404);
    }
    await EmployeeValidationSchema.validateAsync(req.body);

    const user = new Employee({
      company_id: companyId,
      name: name,
      dob: dob,
      email: email,
      phone: phone,
      salary: salary,
      deleted_at: deleted_at,
      updated_at: updated_at,
    });

    const saveUser = await user.save();

    res.status(201).json({
      status: true,
      data: saveUser,
    });
  } else if (req.method === "PUT") {
    const { _id } = JSON.parse(req.body);
    const updateData = JSON.parse(req.body);
    const updatedata = await Employee.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(201).json({
      status: true,
      data: updatedata,
    });
  }
});
